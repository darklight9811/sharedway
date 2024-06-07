import Footer from "../_components/footer"
import Navbar from "../_components/navbar"

export default function Layout ({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />

			{children}

			<Footer />
		</>
	)
}