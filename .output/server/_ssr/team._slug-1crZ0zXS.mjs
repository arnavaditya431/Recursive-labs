import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team._slug-1crZ0zXS.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ reset }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "container-editorial py-32 sm:py-40 text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl sm:text-4xl",
		children: "Something went wrong."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: reset,
		className: "mt-6 rounded-full border hairline px-5 py-3 sm:py-2 text-sm touch-target",
		children: "Try again"
	})]
});
//#endregion
export { SplitErrorComponent as errorComponent };
