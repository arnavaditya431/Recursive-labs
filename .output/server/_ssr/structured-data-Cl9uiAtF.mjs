import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/structured-data-Cl9uiAtF.js
var import_jsx_runtime = require_jsx_runtime();
function StructuredData({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: (Array.isArray(data) ? data : [data]).map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(item) }
	}, index)) });
}
//#endregion
export { StructuredData as t };
