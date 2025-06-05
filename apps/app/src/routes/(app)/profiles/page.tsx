import { useQuery } from "@tanstack/react-query";
import { UserRoundX } from "lucide-react";
import { Link } from "react-router";

import { buttonVariants } from "@repo/ds/button";
import { Card } from "@repo/ds/card";
import { useSearch } from "@repo/ds/hooks/use-search";
import { useTranslation } from "@repo/ds/lib/localization";
import { Pagination } from "@repo/ds/pagination";

import { paginationSchema } from "@repo/domains/app";
import { Filter, Sort } from "@repo/domains/profiles";
import { metadata } from "@repo/domains/utils/metadata";

import { trpc } from "@repo/domains";

export const meta = metadata({ title: "Desaparecidos" });

export default function Page() {
	const { t } = useTranslation("profiles");
	const [pagination] = useSearch(paginationSchema);
	const { data: list } = useQuery(trpc.profiles.index.queryOptions(pagination));

	return (
		<div className="flex flex-col sm:flex-row grow sm:container mx-auto px-4 my-4 gap-4 relative">
			<aside className="w-full sm:w-1/3">
				<h5 className="w-full text-xl py-4 pl-4 font-bold">
					{t("profiles")} - {t("filter")}
				</h5>

				<Filter data={pagination} />
			</aside>
			<main className="w-full flex flex-col justify-between relative">
				<Sort
					className="flex gap-2 bg-white rounded-[24px] *:m-0 p-2 shadow sticky top-[72px] z-[11]"
					order={{
						name: t("new.general.name"),
						date_created: t("date_created"),
						date_disappeared: t("date_disappeared"),
					}}
				/>
				<div className="flex mb-auto flex-wrap justify-between gap-4 my-4">
					{list?.[0].map((profile) => {
						return <Card key={profile.id} {...profile} />;
					})}

					{list?.[0].length === 0 && (
						<div className="flex justify-center items-center gap-4 flex-col text-center my-auto w-full">
							<UserRoundX size={64} />
							<h2 className="text-2xl font-bold">{t("empty")}</h2>
							<p>Gostaria de registrar um novo desaparecido?</p>
							<Link className={buttonVariants()} to="/profiles/new">
								Registrar
							</Link>
						</div>
					)}

					{(list?.[0].length || 0) > 0 &&
						Array.from(new Array((pagination.limit - (list?.[0].length || 0)) % 4)).map((x) => (
							<div key={x} className="max-w-[47%] sm:max-w-[210px] w-full" />
						))}
				</div>

				<Pagination page={pagination.page || 1} pages={list?.[1].pages || 0} />
			</main>
		</div>
	);
}
