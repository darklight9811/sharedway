import { Button } from "@repo/ds/ui/button";
import users from "@repo/services/user";


export default async function Page() {
	const data = await users.index()

  return (
    <main className="">
	  <Button>Teste</Button>

	  <pre>{JSON.stringify(data, null, 4)}</pre>
    </main>
  );
}
