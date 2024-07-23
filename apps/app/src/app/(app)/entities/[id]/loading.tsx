import { Skeleton } from "@repo/ds/ui/skeleton";

export default function Loading() {
	return (
		<main className="p-4 flex flex-col md:flex-row grow container gap-2">
			<div className="md:max-w-[280px] w-full">
				<Skeleton className="mr-2 w-xs/2 max-w-full mx-8 mb-4 aspect-square rounded-full" />

				<h1 className="font-bold flex gap-1">
					<Skeleton className="w-full h-6" />
				</h1>

				<Skeleton className="w-full h-6 mt-1" />

				<div className="flex gap-2 mt-4">
					<Skeleton className="w-full h-10" />
					<Skeleton className="w-14 h-10" />
				</div>

				<div className="flex gap-2 my-2 justify-between">
					<Skeleton className="w-10 h-10" />
					<Skeleton className="w-10 h-10" />
				</div>

				<div className="text-xs">
					<Skeleton className="w-[75%] h-4" />
				</div>
			</div>

			<div className="w-full">
				<h2 className="mb-4 font-bold text-xl">
					<Skeleton className="w-full h-7" />
				</h2>

				<div>
					<Skeleton className="w-full h-[75px]" />
				</div>

				<h2 className="my-4 font-bold text-xl">
					<Skeleton className="w-full h-7" />
				</h2>

				<div className="flex flex-wrap">
					<div className="w-1/2 mb-1">
						<Skeleton className="w-[128px] h-6" />
					</div>
					<div className="w-1/2 mb-1">
						<Skeleton className="w-[52px] h-6" />
					</div>
					<div className="w-1/2 mb-1">
						<Skeleton className="w-[76px] h-6" />
					</div>
					<div className="w-1/2 mb-1">
						<Skeleton className="w-[90px] h-6" />
					</div>
				</div>

				<h2 className="my-4 font-bold text-xl">
					<Skeleton className="w-full h-7" />
				</h2>

				<div className="flex flex-col md:flex-row gap-4">
					<div className="w-full sm:w-1/2">
						<Skeleton className="w-full h-10" />
						<div className="flex flex-wrap p-2">
							<div className="w-1/2 mb-1">
								<Skeleton className="w-[90px] h-6" />
							</div>
							<div className="w-1/2 mb-1">
								<Skeleton className="w-[128px] h-6" />
							</div>
							<div className="w-1/2 mb-1">
								<Skeleton className="w-[70px] h-6" />
							</div>
							<div className="w-1/2 mb-1">
								<Skeleton className="w-[90px] h-6" />
							</div>
						</div>
					</div>

					<Skeleton className="w-full sm:w-1/2 aspect-video relative" />
				</div>
			</div>
		</main>
	);
}
