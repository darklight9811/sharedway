"use client";

import { Input } from "@repo/ds/ui/input";

import useDebounce from "@repo/ds/hooks/use-debounce";

export default function MiniSearch() {
	const [value, setvalue] = useDebounce(() => {}, "");

	return (
		<div className="mt-8 w-full flex justify-center">
			<Input
				className="max-w-md"
				placeholder="Pesquise o nome de quem você busca..."
				value={value}
				onChange={(e) => setvalue(e.target.value)}
			/>
		</div>
	);
}
