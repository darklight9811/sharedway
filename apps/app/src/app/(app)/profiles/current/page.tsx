import { auth } from "@clerk/nextjs/server";
import Card from "@repo/ds/ui/card";
import { Pagination } from "@repo/ds/ui/pagination";
import type { Pagination as PaginationType } from "@repo/schemas/pagination";
import profileService from "@repo/services/profile";
import parallel from "../../../../lib/parallel";

export default async function Page(props: { searchParams: PaginationType }) {
	const [[data, pagination]] = await parallel(
		profileService.index({
			...props.searchParams,
			user: auth().userId || undefined,
		}),
	);

	return (
		<div className="flex flex-wrap grow container my-4">
			<main className="w-full flex flex-col justify-between">
				<div className="flex flex-wrap justify-center sm:justify-between gap-4 my-4">
					{data.map((profile) => {
						return <Card key={profile.id} {...profile} />;
					})}
				</div>

				<Pagination page={pagination.page || 1} pages={pagination.pages} />
			</main>
		</div>
	);
}
