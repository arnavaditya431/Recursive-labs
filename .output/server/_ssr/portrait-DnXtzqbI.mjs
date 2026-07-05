import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portrait-DnXtzqbI.js
var import_jsx_runtime = require_jsx_runtime();
function initials(name) {
	return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}
function Portrait({ src, alt, name, className, imageClassName, grayscale = false, lazy = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative overflow-hidden bg-secondary", className),
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			loading: lazy ? "lazy" : "eager",
			decoding: "async",
			className: cn("h-full w-full object-cover transition-all duration-700", grayscale && "grayscale", imageClassName)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary via-background to-primary/20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-5xl text-foreground/30 md:text-6xl",
				children: initials(name)
			})
		})
	});
}
function PortraitHero({ src, alt, name, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
		src,
		alt,
		name,
		className: cn("aspect-[3/4] border hairline", className),
		lazy: false
	});
}
//#endregion
export { PortraitHero as n, Portrait as t };
