import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "../lib/utils";
import { type Button, buttonVariants } from "./button";

function Pagination(props: { page: number; pages: number }) {
	return (
		<PaginationWrapper className="mt-4">
			<PaginationContent>
				{props.page > 1 && <PaginationPrevious href={`?page=${props.page - 1}`} />}

				{Array.from(Array(props.pages)).map((_, i) => (
					<PaginationLink isActive={props.page === i + 1} href={`?page=${i + 1}`} key={`${i}${props.pages}`}>
						{i + 1}
					</PaginationLink>
				))}

				{props.page < props.pages && <PaginationNext href={`?page=${props.page + 1}`} />}
			</PaginationContent>
		</PaginationWrapper>
	);
}

function PaginationWrapper({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1", className)} {...props} />
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
	return (
		<a
			aria-current={isActive ? "page" : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn(
				buttonVariants({
					variant: isActive ? "outline" : "ghost",
					size,
				}),
				className,
			)}
			{...props}
		/>
	);
}

function PaginationPrevious({ className, size, ...props }: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size={size || "default"}
			className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
			{...props}
		>
			<ChevronLeftIcon />
			<span className="hidden sm:block">Previous</span>
		</PaginationLink>
	);
}

function PaginationNext({ className, size, ...props }: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size={size || "default"}
			className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
			{...props}
		>
			<span className="hidden sm:block">Next</span>
			<ChevronRightIcon />
		</PaginationLink>
	);
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}
		>
			<MoreHorizontalIcon className="size-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationWrapper,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
};
