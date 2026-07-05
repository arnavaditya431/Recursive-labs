import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as ArrowLeft } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./team._slug-CMvXRBq9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team._slug-BGDt35Gw.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => {
	const { slug } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-editorial py-32 sm:py-40 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-eyebrow",
				children: "Not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-4 font-display text-4xl sm:text-5xl",
				children: [
					"No profile for “",
					slug,
					"”."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/team",
				className: "mt-8 inline-flex items-center justify-center gap-2 rounded-full border hairline px-5 py-3 sm:py-2 text-sm hover:bg-foreground hover:text-background transition touch-target",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to leadership"]
			})
		]
	});
};
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
