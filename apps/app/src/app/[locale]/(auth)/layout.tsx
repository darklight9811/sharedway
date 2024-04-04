export default function Layout ({ children }: { children: React.ReactNode }) {
	return (
		<div className="grow flex justify-center items-center">
			{children}
		</div>
	)
}