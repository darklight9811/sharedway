import Card from "@repo/ds/ui/card";
import { Pagination } from "@repo/ds/ui/pagination";
import type { Pagination as PaginationType } from "@repo/schemas/pagination";
import entityService from "@repo/services/entity";
import parallel from "../../../../lib/parallel";
import { Filter } from "./_components/filter";

export default async function Page(props: { searchParams: PaginationType }) {
	const [[data, pagination]] = await parallel(
		entityService.index(props.searchParams),
	);

	return (
		<div className="flex flex-col sm:flex-row grow container my-4 gap-4">
			<aside className="w-full sm:w-1/3">
				<h5 className="w-full text-xl mb-4">Filtro</h5>

				<Filter data={props.searchParams} />
			</aside>
			<main className="w-full flex flex-col justify-between">
				<div className="flex flex-wrap justify-center sm:justify-between gap-4 my-4">
					{data.map((entity) => {
						return <Card key={entity.id} {...entity} />;
					})}
				</div>

				<Pagination page={pagination.page || 1} pages={pagination.pages} />
			</main>
		</div>
	);
}
