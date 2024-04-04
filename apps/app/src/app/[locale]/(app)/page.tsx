import entityService from "@repo/services/entity"
import parallel from "../../../lib/parallel"
import type { Pagination } from "@repo/schemas/pagination"

export default async function Page(props: { params: Pagination }) {
	const [data] = await parallel(
		entityService.index(props.params),
	)

	return (
		<main className="">
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</main>
	)
}
