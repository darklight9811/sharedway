import { Sort } from "@/components/sort";
import { Link } from "@/lib/navigation";
import { buttonVariants } from "@repo/ds/ui/button";
import Card from "@repo/ds/ui/card";
import { Pagination } from "@repo/ds/ui/pagination";
import { Skeleton } from "@repo/ds/ui/skeleton";
import type { Pagination as PaginationType } from "@repo/schemas/pagination";
import entityService from "@repo/services/entity";
import { UserRoundX } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense, createElement } from "react";
import parallel from "../../../lib/parallel";
import { Filter } from "./_components/filter";

export default async function Page(props: { searchParams: PaginationType }) {
	const [t] = await parallel(getTranslations("entities"));

	return (
		<div className="flex flex-col sm:flex-row grow sm:container px-4 my-4 gap-4">
			<aside className="w-full sm:w-1/3">
				<h5 className="w-full text-xl py-4 pl-4 font-bold">
					{t("entities")} - {t("filter")}
				</h5>

				<Filter data={props.searchParams} />
			</aside>
			<main className="w-full flex flex-col justify-between">
				<Sort
					className="flex gap-2 bg-white rounded-lg *:m-0 p-2 shadow"
					data={props.searchParams}
					order={{
						name: t("new.general.name"),
						date_created: t("date_created"),
						date_disappeared: t("date_disappeared"),
					}}
				/>
				<Suspense fallback={<LoadingState />}>
					{createElement(async function Render() {
						const [[data, pagination]] = await parallel(
							entityService.index(props.searchParams),
						);

						return (
							<>
								<div className="flex mb-auto flex-wrap justify-between gap-4 my-4">
									{data.map((entity) => {
										return <Card key={entity.id} {...entity} />;
									})}

									{data.length === 0 && (
										<div className="flex justify-center items-center gap-4 flex-col text-center my-auto w-full">
											<UserRoundX size={64} />
											<h2 className="text-2xl font-bold">{t("empty")}</h2>
											<p>Gostaria de registrar um novo desaparecido?</p>
											<Link className={buttonVariants()} href="/entities/new">
												Registrar
											</Link>
										</div>
									)}

									{data.length > 0 &&
										Array.from(
											new Array((pagination.limit - data.length) % 4),
										).map((x) => (
											<div
												key={x}
												className="max-w-[47%] sm:max-w-[210px] w-full"
											/>
										))}
								</div>

								<Pagination
									page={pagination.page || 1}
									pages={pagination.pages}
								/>
							</>
						);
					})}
				</Suspense>
			</main>
		</div>
	);
}

function LoadingState() {
	return (
		<div className="flex mb-auto flex-wrap justify-between gap-4 my-4">
			{Array.from(new Array(8)).map((i) => (
				<Skeleton
					key={i}
					className="max-w-[47%] sm:max-w-[210px] w-full aspect-card"
				/>
			))}
		</div>
	);
}
