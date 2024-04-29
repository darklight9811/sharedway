import { Ghost } from "lucide-react"
import Navbar from "./_components/navbar"

export default function NotFoundPage() {
	return (
		<>
			<Navbar />

			<main className="grow flex justify-center items-center">
				<Ghost />

				<h1>Page not found</h1>
			</main>
		</>
	)
}