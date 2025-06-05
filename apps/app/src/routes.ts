import { layout, prefix, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	layout("routes/(auth)/layout.tsx", [
		route("/register", "routes/(auth)/register/page.tsx"),
		route("/login", "routes/(auth)/login/page.tsx"),
	]),

	layout("routes/(app)/layout.tsx", [
		route("/", "./routes/(app)/page.tsx"),

		...prefix("/profiles", [
			route("/", "./routes/(app)/profiles/page.tsx"),
			route("/new", "./routes/(app)/profiles/new/page.tsx"),
		]),

		// catch-all
		route("/*", "./routes/(app)/not-found.tsx", { id: "not-found" }),
	]),
] satisfies RouteConfig;
