import { a as __toESM } from "../_runtime.mjs";
import { n as useScroll, t as useTransform } from "../_libs/framer-motion.mjs";
import { a as breadcrumbSchema, t as BRAND } from "./seo-jqMf855H.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StructuredData } from "./structured-data-Cl9uiAtF.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Reveal } from "./reveal-DgNVJpJO.mjs";
import { b as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as useIsMobile } from "./use-mobile-C9U6eJ4k.mjs";
import { n as team } from "./team-TTw5Yq0x.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Portrait } from "./portrait-DnXtzqbI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team.index-CrFgWQdD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TeamPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: breadcrumbSchema([{
			name: "Home",
			path: "/"
		}, {
			name: "Leadership",
			path: "/team"
		}]) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-editorial pt-16 sm:pt-24 pb-10 sm:pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow",
					children: "Leadership"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl",
					children: ["The people ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic text-primary/90",
						children: "behind the work."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground",
					children: [BRAND.name, " is built by a close-knit team of engineers, strategists, and designers. Each leader occupies a discipline; all of us stay close to the work."]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: team.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberPanel, {
			member: m,
			index: i
		}, m.slug)) })
	] });
}
function MemberPanel({ member, index }) {
	const ref = (0, import_react.useRef)(null);
	const isMobile = useIsMobile();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const filter = useTransform(useTransform(scrollYProgress, [.2, .55], [1, 0]), (g) => `grayscale(${g})`);
	const textOpacity = useTransform(scrollYProgress, [.35, .6], [0, 1]);
	const reverse = index % 2 === 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative min-h-0 lg:min-h-screen overflow-hidden border-t hairline",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-10 sm:opacity-20",
				style: {
					backgroundImage: `url(${member.specializationBg})`,
					backgroundSize: "cover",
					backgroundPosition: "center"
				},
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 bg-background/88 backdrop-blur-[2px]",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative container-editorial flex lg:min-h-screen items-center py-12 sm:py-16 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `lg:col-span-6 ${reverse ? "lg:order-2" : ""}`,
						children: isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-square w-full sm:aspect-[4/5] max-w-sm sm:max-w-md mx-auto overflow-hidden border hairline rounded-2xl shadow-xl shadow-background/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
									src: member.photo,
									alt: `${member.name}, ${member.role}`,
									name: member.name,
									className: "h-full w-full"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs font-mono text-muted-foreground",
									children: [
										"0",
										index + 1,
										" / 0",
										team.length
									]
								})
							]
						}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							style: { filter },
							className: "relative aspect-[3/4] w-full max-w-lg overflow-hidden border hairline",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
									src: member.photo,
									alt: `${member.name}, ${member.role}`,
									name: member.name,
									className: "h-full w-full"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute left-4 top-4 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs font-mono text-muted-foreground",
									children: [
										"0",
										index + 1,
										" / 0",
										team.length
									]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `lg:col-span-6 flex flex-col justify-center ${reverse ? "lg:order-1" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow mb-2",
								children: member.focus
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display font-bold text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.85] tracking-tighter uppercase text-foreground drop-shadow-sm",
								children: member.name
							}),
							isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-display italic text-xl sm:text-2xl text-muted-foreground",
									children: member.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm uppercase tracking-widest text-primary/80",
									children: member.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-mono text-muted-foreground uppercase",
									children: member.education[0]?.school
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 sm:mt-6 fluid-body-lg text-foreground/85 max-w-xl",
									children: member.mission
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8 sm:mt-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/team/$slug",
										params: { slug: member.slug },
										className: "group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background hover:bg-primary hover:text-primary-foreground transition touch-target",
										children: ["View profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
									})
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									style: { opacity: textOpacity },
									className: "mt-6 font-display italic text-2xl lg:text-3xl text-muted-foreground",
									children: member.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									style: { opacity: textOpacity },
									className: "mt-2 text-sm uppercase tracking-widest text-primary/80",
									children: member.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									style: { opacity: textOpacity },
									className: "mt-1 text-sm font-mono text-muted-foreground uppercase",
									children: member.education[0]?.school
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									style: { opacity: textOpacity },
									className: "mt-6 text-lg leading-relaxed text-foreground/85 max-w-xl",
									children: member.mission
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									style: { opacity: textOpacity },
									className: "mt-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/team/$slug",
										params: { slug: member.slug },
										className: "group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-primary hover:text-primary-foreground transition",
										children: ["View profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
									})
								})
							] })
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { TeamPage as component };
