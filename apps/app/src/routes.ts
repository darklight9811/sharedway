import { layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	layout("routes/(auth)/layout.tsx", [
		route("/register", "routes/(auth)/register/page.tsx"),
		route("/login", "routes/(auth)/login/page.tsx"),
	]),

	// catch-all
	route("/*", "./routes/not-found.tsx", { id: "not-found" }),

	// api
	route("/api/trpc/*", "./routes/api/trpc/route.ts"),
] satisfies RouteConfig;
