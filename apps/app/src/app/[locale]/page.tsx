import { Button } from "@repo/ds/ui/button"
import entityService from "@repo/services/entity"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const data = await entityService.index()
	const t = await getTranslations("")

	return (
		<main className="">
			<Button>{t("he")}</Button>

			<pre>{JSON.stringify(data, null, 4)}</pre>
		</main>
	)
}
