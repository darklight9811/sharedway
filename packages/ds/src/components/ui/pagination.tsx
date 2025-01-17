import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "../../lib/utils";
import { type ButtonProps, buttonVariants } from "./button";

function Pagination(props: { page: number; pages: number }) {
	return (
		<PaginationWrapper className="mt-4">
			<PaginationContent>
				{props.page > 1 && (
					<PaginationPrevious href={`?page=${props.page - 1}`} />
				)}

				{Array.from(Array(props.pages)).map((_, i) => (
					<PaginationLink
						isActive={props.page === i + 1}
						href={`?page=${i + 1}`}
						key={`${i}${props.pages}`}
					>
						{i + 1}
					</PaginationLink>
				))}

				{props.page < props.pages && (
					<PaginationNext href={`?page=${props.page + 1}`} />
				)}
			</PaginationContent>
		</PaginationWrapper>
	);
}

function PaginationWrapper({
	className,
	...props
}: React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			role="navigation"
			{...props}
		/>
	);
}

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
	<ul
		className={cn("flex flex-row items-center gap-1", className)}
		ref={ref}
		{...props}
	/>
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
	<li className={cn("", className)} ref={ref} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: Omit<PaginationLinkProps, "ref"> & {
	href: Parameters<typeof Link>[0]["href"];
}) {
	return (
		<PaginationItem>
			<Link
				aria-current={isActive ? "page" : undefined}
				className={cn(
					buttonVariants({
						variant: isActive ? "dark" : "ghost",
						size,
					}),
					className,
				)}
				{...props}
			/>
		</PaginationItem>
	);
}
PaginationLink.displayName = "PaginationLink";

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			className={cn("gap-1 pl-2.5", className)}
			size="default"
			{...props}
		>
			<ChevronLeft className="h-4 w-4" />
		</PaginationLink>
	);
}
PaginationPrevious.displayName = "PaginationPrevious";

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			className={cn("gap-1 pr-2.5", className)}
			size="default"
			{...props}
		>
			<ChevronRight className="h-4 w-4" />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			className={cn("flex h-9 w-9 items-center justify-center", className)}
			{...props}
		>
			<MoreHorizontal className="h-4 w-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationWrapper,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
