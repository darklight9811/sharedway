"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { Input } from "@repo/ds/ui/input";

import { Link } from "@/lib/navigation";
import { index } from "@/modules/entity/actions";
import { buttonVariants } from "@repo/ds/ui/button";
import Card from "@repo/ds/ui/card";
import { Loader } from "lucide-react";

export default function MiniSearch() {
	const reset = useRef(false);
	const input = useRef<HTMLInputElement>(null);
	const debounce = useRef<NodeJS.Timeout>();
	const [value, setvalue] = useState("");
	const [search, setsearch] = useState("");

	const { data, isLoading } = useQuery({
		initialData: [],
		queryKey: ["_", search],
		enabled: !!search,
		async queryFn({ queryKey: [, search] }) {
			const resp = await index({ limit: 12, q: search });
			return resp.data?.[0] || [];
		},
	});

	return (
		<div ref={input} className="pt-8 w-full flex flex-col items-center">
			<Input
				className="max-w-md"
				placeholder="Pesquise o nome de quem você busca..."
				value={value}
				onChange={(e) => {
					const { value } = e.target;

					if (value && reset.current === false) {
						input.current?.scrollIntoView();
						reset.current = true;
					}

					setvalue(value);

					if (debounce.current) clearTimeout(debounce.current);
					debounce.current = setTimeout(() => {
						setsearch(value);
					}, 500);
				}}
			/>

			{isLoading && (
				<div className="flex my-12 items-center gap-2 animate-top-in">
					Carregando resultados
					<Loader className="animate-spin" />
				</div>
			)}

			{search && !isLoading && data.length === 0 && (
				<>
					nenhum resultado encontrado{" "}
					<Link href="/register">Cadastrar novo desaparecido</Link>
				</>
			)}

			{data.length > 0 && (
				<>
					<div className="flex flex-wrap w-full max-w-5xl justify-between mt-8">
						{data.map((entry) => (
							<Card {...entry} key={entry.id} />
						))}
					</div>

					<Link
						href={`/search?q=${search}`}
						className={buttonVariants({ class: "mt-8" })}
					>
						Pesquisar mais
					</Link>
				</>
			)}
		</div>
	);
}
