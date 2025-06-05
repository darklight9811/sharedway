import { layout, prefix, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	route("/", "./routes/page.tsx"),

	layout("routes/(auth)/layout.tsx", [
		route("/register", "routes/(auth)/register/page.tsx"),
		route("/login", "routes/(auth)/login/page.tsx"),
	]),

	...prefix("/profiles", [route("/", "./routes/(app)/profiles/page.tsx")]),

	// catch-all
	route("/*", "./routes/not-found.tsx", { id: "not-found" }),
] satisfies RouteConfig;
