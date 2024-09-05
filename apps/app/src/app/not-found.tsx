import { Link } from "@/lib/navigation";
import { buttonVariants } from "@repo/ds/ui/button";
import { Ghost } from "lucide-react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function NotFoundPage() {
	return (
		<>
			<Navbar />

			<main className="grow flex flex-col justify-center items-center">
				<Ghost size={128} />

				<h1 className="text-3xl mb-4">Página não encontrada</h1>

				<Link href="/" className={buttonVariants()}>
					Voltar para home
				</Link>
			</main>

			<Footer />
		</>
	);
}
