import { index, layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	layout("routes/(auth)/layout.tsx", [route("/register", "routes/(auth)/register/page.tsx")]),
	// catch-all
	route("/*", "./routes/not-found.tsx", { id: "not-found" }),
] satisfies RouteConfig;
