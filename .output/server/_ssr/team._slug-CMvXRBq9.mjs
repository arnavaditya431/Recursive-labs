import { s as defaultMeta, t as BRAND } from "./seo-jqMf855H.mjs";
import { t as getMember } from "./team-TTw5Yq0x.mjs";
import { j as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team._slug-CMvXRBq9.js
var $$splitComponentImporter = () => import("./team._slug-iFb44pEh.mjs");
var $$splitErrorComponentImporter = () => import("./team._slug-1crZ0zXS.mjs");
var $$splitNotFoundComponentImporter = () => import("./team._slug-BGDt35Gw.mjs");
var Route = createFileRoute("/team/$slug")({
	loader: ({ params }) => {
		const member = getMember(params.slug);
		if (!member) throw notFound();
		return { member };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return defaultMeta({
			title: "Profile not found",
			noindex: true,
			path: "/team"
		});
		const m = loaderData.member;
		return defaultMeta({
			title: `${m.name} — ${m.role}`,
			description: `${m.name}, ${m.role} at ${BRAND.name}. ${m.bio[0]}`,
			path: `/team/${m.slug}`
		});
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
