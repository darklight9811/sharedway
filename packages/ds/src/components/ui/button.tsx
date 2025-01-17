import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-[32px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				// identity colors
				primary: "bg-primary text-primary-foreground hover:bg-primary/90",
				"primary-gradient":
					"bg-gradient-to-l from-secondary to-primary/50 text-white",
				secondary:
					"bg-[#6fffe9] text-[#183043]-foreground hover:bg-[#6fffe9]/80",
				tertiary: "bg-tertiary text-white hover:bg-tertiary/80",

				// outline
				outline:
					"bg-background border border-input hover:bg-accent hover:text-accent-foreground",
				"outline-destructive":
					"bg-background border border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive",

				// utility
				ghost: "hover:bg-accent hover:text-accent-foreground",
				success: "bg-green-500 text-white hover:bg-bg-green-500/90",
				link: "text-primary underline-offset-4 hover:underline",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				dark: "bg-foreground text-background hover:bg-foreground/90",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-[32px] p-6 font-bold leading-normal tracking-wide text-2xl md:!text-2xl md:!py-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
				type={props.type || "button"}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
