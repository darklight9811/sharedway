import fs from "node:fs";
import path from "node:path";

import lcovParse from "lcov-parse";

/**
 * ### MARK: Types
 */

type CoverageReport = Record<string, Record<string, Record<string, number>>>;

/**
 * ### MARK: Helpers
 */

function getAllPathsForPackagesSummaries() {
	const getDirectories = (source: fs.PathLike) =>
		fs
			.readdirSync(source, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

	const appsPath = path.join(__dirname, "../../apps");
	const appsNames = getDirectories(appsPath);

	const appsSummaries = appsNames.reduce(
		(summary, appName) => {
			summary[appName] = path.join(appsPath, appName, "coverage", "lcov.info");
			return summary;
		},
		{} as Record<string, string>,
	);

	const packagesPath = path.join(__dirname, "../../packages");
	const packageNames = getDirectories(packagesPath);

	const packagesSummaries = packageNames.reduce(
		(summary, packageName) => {
			summary[packageName] = path.join(packagesPath, packageName, "coverage", "lcov.info");
			return summary;
		},
		{} as Record<string, string>,
	);

	return { ...appsSummaries, ...packagesSummaries };
}

function parseLcovFile(reportPath: string, shouldThrow = true) {
	return new Promise<CoverageReport[string]>((r) => {
		lcovParse(reportPath, (err, data) => {
			if (err || !data) {
				if (shouldThrow) console.error(`Error parsing LCOV file for ${reportPath}:`, err);
				return r({});
			}

			const total = {} as Record<string, { total: number; covered: number; skipped: number; pct: number }>;

			for (const entry of data) {
				const { lines, functions } = entry as Record<
					"lines" | "functions",
					{ found: number | string; hit: number | string }
				>;

				const updateCoverage = (type: string, coverage: { found: number | string; hit: number | string }) => {
					if (type in total) {
						if (!total[type].total) total[type].total = 0;
						if (!total[type].covered) total[type].covered = 0;
						if (!total[type].skipped) total[type].skipped = 0;
						if (!total[type].pct) total[type].pct = 0;

						total[type].total += Number(coverage.found || 0);
						total[type].covered += Number(coverage.hit || 0);
						total[type].skipped += Number(coverage.found) - Number(coverage.hit);
						total[type].pct = (total[type].covered / (total[type].total || 1)) * 100;
					} else {
						total[type] = {
							total: Number(coverage.found),
							covered: Number(coverage.hit),
							skipped: Number(coverage.found) - Number(coverage.hit),
							pct: Number(((Number(coverage.hit) / Number(coverage.found)) * 100).toFixed(2)),
						};
					}
				};

				updateCoverage("lines", lines);
				updateCoverage("functions", functions);
			}

			r(total);
		});
	});
}

async function readSummaryPerPackageAndCreateJoinedSummaryReportWithTotal(packagesSummaryPaths: {
	[x: string]: string;
}) {
	const summary = { total: {} } as CoverageReport;

	for (const packageName in packagesSummaryPaths) {
		const reportPath = packagesSummaryPaths[packageName];
		if (fs.existsSync(reportPath)) {
			const total = await parseLcovFile(reportPath);

			summary[packageName] = {
				lines: total.lines,
				functions: total.functions,
			};

			if (!summary.total.lines) summary.total.lines = {};
			summary.total.lines.total = (summary.total.lines?.total || 0) + total.lines.total;
			summary.total.lines.covered = (summary.total.lines?.covered || 0) + total.lines.covered;
			summary.total.lines.skipped = (summary.total.lines?.skipped || 0) + total.lines.skipped;
			summary.total.lines.pct = (summary.total.lines?.covered / (summary.total.lines?.total || 1)) * 100;
			if (!summary.total.functions) summary.total.functions = {};
			summary.total.functions.total = (summary.total.functions?.total || 0) + total.functions.total;
			summary.total.functions.covered = (summary.total.functions?.covered || 0) + total.functions.covered;
			summary.total.functions.skipped = (summary.total.functions?.skipped || 0) + total.functions.skipped;
			summary.total.functions.pct =
				(summary.total.functions?.covered / (summary.total.functions?.total || 1)) * 100;
		}
	}

	return summary;
}

function creteDiffCoverageReport(currCoverage: CoverageReport, prevCoverage: CoverageReport = {}) {
	return Object.keys(currCoverage).reduce((summary, packageName) => {
		const currPackageCoverage = currCoverage[packageName];
		const prevPackageCoverage = prevCoverage[packageName];
		if (prevPackageCoverage) {
			const coverageKeys = ["lines", "functions"];
			for (const key of coverageKeys) {
				const prevPct = prevPackageCoverage[key]?.pct || 0;
				const currPct = currPackageCoverage[key]?.pct || 0;

				currPackageCoverage[key] = {
					...currPackageCoverage[key],
					pctDiff: Number.parseFloat(`${currPct}`) - Number.parseFloat(`${prevPct}`),
				};
			}
		}

		summary[packageName] = currPackageCoverage;
		return summary;
	}, {} as CoverageReport);
}
function formatPtcWithDiff(ptc: string | number, ptcDiff?: string | number) {
	return appendDiff(formatDecimal(ptc), typeof ptcDiff !== "undefined" ? formatDecimal(ptcDiff) : undefined);
}

function formatDecimal(ptc: string | number) {
	return Number.parseFloat(`${ptc}`).toFixed(2);
}

function appendDiff(ptc: string, ptcDiff?: string) {
	if (!ptcDiff || Number(ptcDiff) === Number(ptc)) {
		return ptc;
	}
	return `${ptc} (${Number(ptcDiff) > 0 ? "+" : ""}${ptcDiff}%)`;
}

/**
 * Takes the coverage report and returns an object with the
 * coverage for each package and the total coverage suitable
 * for the visual representation in a console table
 * @param {*} coverageReport
 * @returns
 * */
function createCoverageReportForVisualRepresentation(coverageReport: CoverageReport) {
	return Object.keys(coverageReport).reduce(
		(report, packageName) => {
			const { lines, functions } = coverageReport[packageName];
			report[packageName] = {
				lines: formatPtcWithDiff(lines.pct, lines.pctDiff),
				functions: formatPtcWithDiff(functions.pct, functions.pctDiff),
			};

			return report;
		},
		{} as Record<string, unknown>,
	);
}

async function getPreviousCoverage() {
	try {
		const coverage = await Bun.file("../coverage/coverage-total.json").json();
		return coverage;
	} catch (_) {
		return { total: {} };
	}
}

function saveCoverage(coverage: CoverageReport) {
	return Bun.file("../coverage/coverage-total.json").write(JSON.stringify(coverage, null, 4));
}

/**
 * ### MARK: Execution
 */

const prevCoverage = await getPreviousCoverage();
const packagesSummaryPaths = getAllPathsForPackagesSummaries();
const currCoverageReport = await readSummaryPerPackageAndCreateJoinedSummaryReportWithTotal(packagesSummaryPaths);
const diffCoverageReport = creteDiffCoverageReport(currCoverageReport, prevCoverage);
const coverageReportForVisualRepresentation = createCoverageReportForVisualRepresentation(diffCoverageReport);
await saveCoverage(currCoverageReport);
console.table(coverageReportForVisualRepresentation);
