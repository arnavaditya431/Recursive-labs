import { a as breadcrumbSchema, t as BRAND } from "./seo-jqMf855H.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StructuredData } from "./structured-data-Cl9uiAtF.mjs";
import { t as Reveal } from "./reveal-DgNVJpJO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BH9V_Uhw.js
var import_jsx_runtime = require_jsx_runtime();
var values = [
	{
		k: "Craft",
		v: "We hold ourselves to a standard of work we would be proud to inherit."
	},
	{
		k: "Candour",
		v: "We tell clients what we actually think, especially when it is inconvenient."
	},
	{
		k: "Ownership",
		v: "We take responsibility for outcomes, not just deliverables."
	},
	{
		k: "Restraint",
		v: "We know what to leave out. Simplicity is a discipline, not a style."
	},
	{
		k: "Longevity",
		v: "We design for the systems still running five years from now."
	},
	{
		k: "People",
		v: "We treat every collaborator, client, and teammate with seriousness and care."
	}
];
var timeline = [
	{
		year: "2026",
		title: "Founded",
		body: "Recursion Labs is officially founded by a team of engineers, designers and strategists with the vision of building modern software and digital products."
	},
	{
		year: "2026",
		title: "First Engagements",
		body: "The founding team begins delivering technology consulting, software engineering and product design services to early clients."
	},
	{
		year: "2026",
		title: "Growth",
		body: "Expansion into AI consulting, cloud engineering, automation and digital transformation services while growing a distributed team across India."
	},
	{
		year: "2026",
		title: "Today",
		body: "Recursion Labs operates as a modern technology consultancy focused on software engineering, AI, cloud solutions and product innovation."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: breadcrumbSchema([{
			name: "Home",
			path: "/"
		}, {
			name: "About",
			path: "/about"
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-editorial pt-16 sm:pt-24 pb-16 sm:pb-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-eyebrow",
					children: ["About ", BRAND.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl",
					children: [
						"Small teams. ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-primary/90",
							children: "Serious work."
						}),
						" Long horizons."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground",
					children: [
						"We founded ",
						BRAND.name,
						" to do the kind of consulting we always wanted to be on the receiving end of. Senior people, unambiguous ownership, and a bias for shipping software that stands the test of time."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-y hairline overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80",
				alt: "Modern corporate workspace with collaborative technology teams",
				className: "absolute inset-0 h-full w-full object-cover opacity-20",
				loading: "lazy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative container-editorial grid gap-10 sm:gap-16 py-16 sm:py-24 lg:grid-cols-3",
				children: [
					{
						label: "Our journey",
						body: `What began as a set of independent engagements between friends became a firm the moment we realised we kept being asked to lead the work end to end. ${BRAND.name} is the result of that conversation.`
					},
					{
						label: "Vision",
						body: "To be the technology partner that ambitious organisations trust with the systems they cannot afford to get wrong. Chosen not for scale, but for depth."
					},
					{
						label: "Mission",
						body: "To design, build, and operate durable digital systems. To do it with restraint. And to leave our clients more capable than we found them."
					}
				].map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: b.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 sm:mt-6 font-display text-xl sm:text-2xl leading-snug",
						children: b.body
					})] })
				}, b.label))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-editorial section-py-lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "Core values"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 sm:mt-6 font-display fluid-h2",
						children: "What we hold ourselves to."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-8 grid gap-px bg-hairline sm:grid-cols-2 border hairline",
					children: values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-background p-6 sm:p-8 h-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-xs text-primary",
									children: ["0", i + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 sm:mt-4 font-display fluid-h3",
									children: v.k
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 sm:mt-3 text-sm leading-relaxed text-muted-foreground",
									children: v.v
								})
							]
						})
					}, v.k))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t hairline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-editorial section-py-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "Timeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 sm:mt-6 font-display fluid-h2",
						children: "Milestones."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 sm:mt-16 space-y-0",
						children: [timeline.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * .06,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 items-start gap-2 sm:gap-4 border-t hairline py-6 sm:py-10 md:grid-cols-[120px_1fr_2fr] md:gap-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-sm text-primary",
										children: t.year
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display fluid-h3",
										children: t.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground leading-relaxed",
										children: t.body
									})
								]
							})
						}, t.year)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t hairline" })]
					})
				]
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
