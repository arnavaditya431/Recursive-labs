import { a as breadcrumbSchema } from "./seo-jqMf855H.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StructuredData } from "./structured-data-Cl9uiAtF.mjs";
import { t as Reveal } from "./reveal-DgNVJpJO.mjs";
import { b as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as services } from "./services-DXKwhnB2.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-DNNyF3I7.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: breadcrumbSchema([{
			name: "Home",
			path: "/"
		}, {
			name: "Services",
			path: "/services"
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-editorial pt-16 sm:pt-24 pb-16 sm:pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow",
					children: "Practices"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl",
					children: ["Six practices. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic text-primary/90",
						children: "One standard."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground",
					children: "Our practices are the disciplines we invest in deeply. Engagements often draw on more than one, orchestrated by a single principal accountable end to end."
				})
			]
		}),
		services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: s.slug,
			className: `border-t hairline ${i % 2 === 1 ? "bg-card/40" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-editorial py-16 sm:py-24 md:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 sm:gap-16 lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm text-primary",
								children: s.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 sm:mt-6 font-display fluid-h2",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 sm:mt-6 font-display text-lg sm:text-xl italic text-muted-foreground",
								children: s.short
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-8 space-y-10 sm:space-y-14",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "fluid-body-lg text-muted-foreground",
								children: s.overview
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow",
								children: "Benefits"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2",
								children: s.benefits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3 border-t hairline pt-3 sm:pt-4 text-sm text-foreground/90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" }), b]
								}, b))
							})] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow",
								children: "Technologies"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 sm:mt-6 flex flex-wrap gap-2",
								children: s.technologies.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border hairline px-3 py-1.5 text-xs font-mono text-muted-foreground",
									children: t
								}, t))
							})] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow",
								children: "Process"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 sm:mt-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
								children: s.process.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t hairline pt-3 sm:pt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-xs text-primary",
											children: p.step
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-display text-lg sm:text-xl",
											children: p.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground leading-relaxed",
											children: p.body
										})
									]
								}, p.step))
							})] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								className: "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border hairline px-5 py-3 sm:py-2.5 text-sm hover:bg-foreground hover:text-background transition touch-target",
								children: [
									"Discuss a ",
									s.name.toLowerCase(),
									" engagement",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
								]
							}) })
						]
					})]
				})
			})
		}, s.slug))
	] });
}
//#endregion
export { ServicesPage as component };
