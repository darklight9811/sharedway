import { index, layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	layout("routes/(auth)/layout.tsx", [route("/register", "routes/(auth)/register/page.tsx")]),
] satisfies RouteConfig;
