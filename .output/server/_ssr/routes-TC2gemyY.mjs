import { a as breadcrumbSchema, n as PRACTICES, t as BRAND } from "./seo-jqMf855H.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StructuredData } from "./structured-data-Cl9uiAtF.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Reveal } from "./reveal-DgNVJpJO.mjs";
import { _ as Award, b as ArrowRight, h as Globe, n as Users, s as Shield, y as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as services } from "./services-DXKwhnB2.mjs";
import { n as team } from "./team-TTw5Yq0x.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Portrait } from "./portrait-DnXtzqbI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-TC2gemyY.js
var import_jsx_runtime = require_jsx_runtime();
var HERO_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80";
var trustIndicators = [
	{
		icon: Shield,
		label: "Enterprise-grade delivery"
	},
	{
		icon: Users,
		label: "Senior-led engagements"
	},
	{
		icon: Award,
		label: "Engineering-first culture"
	},
	{
		icon: Globe,
		label: "Global client footprint"
	}
];
var strengths = [
	{
		title: "Senior by default",
		body: "Every engagement is led by principals who own outcomes, not decks. No layers between you and the people doing the work."
	},
	{
		title: "Engineering as posture",
		body: "We treat delivery as a craft discipline. Test coverage, observability, and honest documentation are the floor, not the ceiling."
	},
	{
		title: "Small on purpose",
		body: "We stay deliberately small so we can be selective. Fewer clients, deeper relationships, better work."
	},
	{
		title: "Long time horizons",
		body: "We build for the systems you will still be operating in five years. Fashions come and go. Cost and reliability do not."
	}
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: breadcrumbSchema([{
				name: "Home",
				path: "/"
			}]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-[100dvh] md:min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: HERO_IMAGE,
						alt: "Modern corporate skyline representing enterprise technology infrastructure",
						className: "h-full w-full object-cover",
						fetchPriority: "high"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 hero-overlay" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative container-editorial flex min-h-[100dvh] flex-col justify-end pb-12 pt-24 sm:justify-center md:min-h-[calc(100vh-4rem)] md:py-16 lg:min-h-[calc(100vh-5rem)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full max-w-5xl flex-col items-start justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
								initial: {
									opacity: 0,
									y: 8
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { duration: .6 },
								className: "text-eyebrow",
								children: [
									BRAND.name,
									" · Est. ",
									BRAND.founded,
									" · Technology Consultancy"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
								initial: {
									opacity: 0,
									y: 16
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									delay: .2,
									duration: .8,
									ease: [
										.22,
										1,
										.36,
										1
									]
								},
								className: "mt-6 sm:mt-8 font-display font-bold text-[clamp(4rem,14vw,9.5rem)] leading-[0.82] tracking-tighter uppercase text-foreground drop-shadow-xl",
								children: [
									"Recursion",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Labs"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 12
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									delay: .4,
									duration: .8
								},
								className: "mt-6 sm:mt-8 font-display italic text-2xl sm:text-3xl lg:text-4xl text-primary/90",
								children: "Engineering ideas. Building tomorrow."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
								initial: {
									opacity: 0,
									y: 12
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									delay: .6,
									duration: .8
								},
								className: "mt-6 sm:mt-8 max-w-2xl fluid-body-lg text-muted-foreground/90",
								children: [BRAND.shortName, " is a premium boutique consultancy delivering software engineering, artificial intelligence, cloud solutions, and product design for organisations that treat their platforms as strategic assets."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								transition: { delay: .8 },
								className: "mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "group inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-6 py-4 sm:py-3.5 text-sm text-background transition hover:bg-primary hover:text-primary-foreground touch-target shadow-lg shadow-foreground/10",
									children: ["Start a conversation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/services",
									className: "group inline-flex items-center justify-center gap-3 rounded-full border hairline bg-background/5 backdrop-blur-sm px-6 py-4 sm:py-3.5 text-sm hover:border-foreground/60 hover:bg-background/20 touch-target",
									children: ["See what we do", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: 12
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { delay: 1 },
								className: "mt-10 sm:mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6",
								children: trustIndicators.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
										className: "mt-0.5 h-4 w-4 shrink-0 text-primary drop-shadow-md",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs sm:text-sm leading-snug text-muted-foreground",
										children: item.label
									})]
								}, item.label))
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y hairline py-4 sm:py-6 overflow-hidden",
				"aria-label": "Practice areas",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "marquee flex whitespace-nowrap gap-8 sm:gap-16 font-display text-lg sm:text-2xl text-muted-foreground",
					children: Array.from({ length: 2 }).map((_, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-8 sm:gap-16",
						children: PRACTICES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-8 sm:gap-16",
							children: [t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								"aria-hidden": "true",
								children: "◆"
							})]
						}, t))
					}, r))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "container-editorial section-py-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow",
							children: "01 — About"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 sm:mt-6 font-display fluid-h2",
							children: "A consultancy, sized\xA0for depth."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7 lg:col-start-6 space-y-5 sm:space-y-6 fluid-body-lg text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [BRAND.name, " was founded on a simple premise. That the best technology work comes from small teams of senior people who own outcomes end to end, and who stay long enough to see their decisions through."] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: .1,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We partner with founders, functional leaders, and enterprise teams on the systems that carry real weight. Our engagements tend to be measured in quarters, not weeks, and we structure them so that our clients emerge with capability, not just deliverables." })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: .2,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/about",
									className: "mt-4 inline-flex items-center gap-2 text-foreground hover:text-primary transition touch-target",
									children: ["Read our story", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-editorial section-py border-t hairline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "02 — Practices"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 sm:mt-6 font-display fluid-h2",
						children: "What we do."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/services",
						className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition touch-target",
						children: ["All services ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 sm:mt-16 grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3 border hairline",
					children: services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/services",
							hash: s.slug,
							className: "group relative flex h-full flex-col justify-between gap-6 sm:gap-10 bg-background p-6 sm:p-8 transition-colors hover:bg-card md:p-10 lg:min-h-[340px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-muted-foreground",
									children: s.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 sm:mt-6 font-display fluid-h3",
									children: s.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 sm:mt-4 text-sm leading-relaxed text-muted-foreground",
									children: s.short
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition",
									children: "Explore"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" })]
							})]
						})
					}, s.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "container-editorial section-py-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-eyebrow",
							children: ["03 — Why ", BRAND.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 sm:mt-6 font-display fluid-h2",
							children: ["Chosen for the work that ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic",
								children: "has to be right."
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7 grid gap-px bg-hairline md:grid-cols-2 border hairline",
						children: strengths.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * .08,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-background p-6 sm:p-8 h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-2 w-2 rounded-full bg-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display fluid-h4",
										children: s.title
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 sm:mt-4 text-sm text-muted-foreground leading-relaxed pl-5",
									children: s.body
								})]
							})
						}, s.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-editorial section-py border-t hairline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "04 — Leadership"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 sm:mt-6 font-display fluid-h2",
						children: "The core team."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/team",
						className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition touch-target",
						children: ["Meet the team ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6",
					children: team.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .08,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/team/$slug",
							params: { slug: m.slug },
							className: "group block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-[3/4] overflow-hidden border hairline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
										src: m.photo,
										alt: `${m.name}, ${m.role}`,
										name: m.name,
										grayscale: true,
										className: "h-full w-full",
										imageClassName: "transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-transparent to-transparent" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 sm:mt-4 font-display text-base sm:text-lg leading-tight",
									children: m.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1",
									children: m.title
								})
							]
						})
					}, m.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "container-editorial section-py-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-lg border hairline p-6 sm:p-10 md:p-16 lg:p-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-16 -top-16 sm:-right-32 sm:-top-32 h-48 w-48 sm:h-96 sm:w-96 rounded-full bg-primary/20 blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-12 -left-12 sm:-bottom-24 sm:-left-24 h-36 w-36 sm:h-72 sm:w-72 rounded-full bg-accent/10 blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-eyebrow",
									children: "05 — Let's talk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-4 sm:mt-6 font-display fluid-h2 max-w-4xl",
									children: ["Have a problem worth ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic",
										children: "engineering?"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 sm:mt-8 max-w-2xl fluid-body-lg text-muted-foreground",
									children: "We take on a small number of engagements each quarter. If your work has the weight to deserve senior attention, we would like to hear from you."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									className: "mt-8 sm:mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 sm:py-3 text-sm text-background hover:bg-primary hover:text-primary-foreground transition touch-target",
									children: ["Start a conversation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { HomePage as component };
