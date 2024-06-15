import { useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Camera, X } from "lucide-react"
import { useUpdate } from "../../lib/react"
import { useTranslations } from "next-intl"

interface Props {
	onChange?(files: File[]): void;

	max?: number;
	size?: number;

	maxQuantityError?: string;
}

export default function ImageUploader(props: Props) {
	const t = useTranslations("form.errors")
	const collapse = useRef(false)
	const [files, setFiles] = useState<(File & { id: string; preview: string })[]>([])
	const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
		noClick: true,
		onDrop(income) {
			setFiles(prev => [
				...prev,
				...income.map(file => Object.assign(file, {
					id: `${Math.ceil(Math.random() * 10000)}`,
					preview: URL.createObjectURL(file),
				})),
			])
		},
		maxSize: (props.size || 2) * 1_000_000,
		multiple: true,
		maxFiles: props.max,
		accept: {
			"img/png": [".png"],
			"img/jpg": [".jpg"],
			"img/jpeg": [".jpeg"],
		},
	})

	useUpdate(function triggerEvent () {
		props.onChange?.(files)
	}, [files])

	collapse.current = false

	return (
		<div {...getRootProps({ className: "relative" })}>
			<input {...getInputProps()} />
			<div className="flex flex-wrap mt-4 gap-2">
				{files.map((file, index) => {
					return (
						<div
							key={file.name + index}
							className="aspect-square w-full max-w-24 rounded-lg bg-cover relative overflow-hidden"
							style={{ backgroundImage: `url(${file.preview})` }}
						>
							<button
								type="button"
								className="absolute w-full h-full top-0 left-0 p-1 flex text-white bg-gradient-to-br from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0)]"
								onClick={() => setFiles(prev => prev.filter(t => t.id !== file.id))}
							>
								<X />
							</button>
						</div>
					)
				})}

				{(!props.max || files.length < props.max) && (
					<button
						onClick={() => open()}
						type="button"
						className=" pb-2 pr-2 relative aspect-square w-full text-border max-w-24 rounded-lg border-4 border-dashed flex justify-center items-center"
					>
						<Camera size="52" />

						<span className="text-5xl absolute bottom-1 right-1">+</span>
					</button>
				)}
			</div>

			{
				fileRejections.map(function (rejection, index) {
					if (rejection.errors.at(0)!.code === "too-many-files") {
						if (collapse.current === true) return null
						collapse.current = true
					}

					return (
						<div
							key={`${index}${rejection.file.name}`}
							className="mt-4 bg-red-300 border-2 border-red-400 rounded p-2"
						>
							{t(rejection.errors.at(0)!.code || rejection.errors.at(0)!.message, {
								name: rejection.file.name,
								size: props.size || 2,
							})}
						</div>
					)
				})
			}

		</div>
	)
}