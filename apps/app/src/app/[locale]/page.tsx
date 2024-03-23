import { Button } from "@repo/ds/ui/button"
import users from "@repo/services/user"
import { getTranslations } from "next-intl/server"


export default async function Page() {
	const data = await users.index()
	const t = await getTranslations("")

	return (
		<main className="">
			<Button>{t("he")}</Button>

			<pre>{JSON.stringify(data, null, 4)}</pre>
		</main>
	)
}
