"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { Input } from "@repo/ds/ui/input";

import { Link } from "@/lib/navigation";
import { index } from "@/modules/profile/actions";
import { buttonVariants } from "@repo/ds/ui/button";
import Card from "@repo/ds/ui/card";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";

const limit = 8;

export default function MiniSearch() {
	const reset = useRef(false);
	const input = useRef<HTMLInputElement>(null);
	const debounce = useRef<ReturnType<typeof setTimeout>>();
	const [value, setvalue] = useState("");
	const [search, setsearch] = useState("");
	const t = useTranslations("home.search");

	const { data: query, isLoading } = useQuery({
		queryKey: ["minisearch", search],
		enabled: !!search,
		async queryFn({ queryKey: [, search] }) {
			const resp = await index({ limit, q: search, page: 1, sort: "asc" });
			return resp.data?.[0] || [];
		},
	});

	const data = query || [];

	return (
		<div ref={input} className="pt-8 w-full flex flex-col items-center">
			<Input
				className="max-w-md"
				placeholder="Pesquise o nome de quem você busca..."
				value={value}
				onChange={(e) => {
					const { value } = e.target;

					if (value && reset.current === false) {
						window.scrollTo(
							0,
							window.scrollY -
								40 +
								(input.current?.getBoundingClientRect().top || 0),
						);
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
					{t("loading")}
					<Loader className="animate-spin" />
				</div>
			)}

			{search && !isLoading && data.length === 0 && (
				<>
					<span className="my-8 font-bold text-lg">{t("empty")}</span>
					<Link href="/profiles/new" className={buttonVariants()}>
						{t("register")}
					</Link>
				</>
			)}

			{data.length > 0 && (
				<>
					<div className="flex flex-wrap w-full max-w-5xl justify-between mt-8 animate-fade-in gap-4">
						{data.map((entry) => (
							<Card {...entry} key={entry.id} className="animate-fade-in" />
						))}
						{data.length > 0 &&
							Array.from(new Array((limit - data.length) % 4)).map((x) => (
								<div key={x} className="max-w-[47%] sm:max-w-[210px] w-full" />
							))}
					</div>

					<Link
						href={`/search?q=${encodeURIComponent(search)}`}
						className={buttonVariants({ class: "mt-8" })}
					>
						{t("more")}
					</Link>
				</>
			)}
		</div>
	);
}
