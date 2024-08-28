import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(214.3 31.8% 91.4%)",
				input: "hsl(214.3 31.8% 91.4%)",
				ring: "hsl(222.2 84% 4.9%)",
				background: "hsl(0 0% 100%)",
				foreground: "hsl(0 2% 30%)",
				primary: {
					DEFAULT: "hsl(208 87% 67%)",
					foreground: "hsl(210 40% 98%)",
				},
				secondary: {
					DEFAULT: "hsl(198 38% 78%)",
					foreground: "hsl(222.2 47.4% 11.2%)",
				},
				destructive: {
					DEFAULT: "hsl(0 84.2% 60.2%)",
					foreground: "hsl(210 40% 98%)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"top-in": {
					"0%": { opacity: "0", transform: "translate(0, -20px)" },
					"100%": { opacity: "1" },
				},
				"left-in": {
					"0%": { opacity: "0", transform: "translate(-20px, 0)" },
					"100%": { opacity: "1" },
				},
			},
			animation: {
				"fade-in": "fade-in 0.4s ease forwards",
				"top-in": "top-in 0.4s ease forwards",
				"left-in": "left-in 0.4s ease forwards",
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			aspectRatio: {
				card: "3/4",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		({ matchUtilities, theme }: any) => {
			matchUtilities(
				{
					"animation-delay": (value: unknown) => {
						return {
							"animation-delay": value,
						};
					},
				},
				{
					values: theme("transitionDelay"),
				},
			);
		},
	],
} satisfies Config;

export default config;
