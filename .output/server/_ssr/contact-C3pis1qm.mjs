import { a as __toESM } from "../_runtime.mjs";
import { a as breadcrumbSchema, i as SOCIAL_LINKS, o as contactPageSchema, t as BRAND } from "./seo-jqMf855H.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as StructuredData } from "./structured-data-Cl9uiAtF.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Reveal } from "./reveal-DgNVJpJO.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { b as ArrowRight, d as MapPin, f as Mail, g as Clock, l as Phone, p as LoaderCircle } from "../_libs/lucide-react.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { t as es_default } from "../_libs/emailjs__browser.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-C3pis1qm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var contactSchema = objectType({
	name: stringType().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
	email: stringType().email("Invalid email address"),
	company: stringType().max(100, "Company name must be under 100 characters").optional(),
	role: stringType().max(100, "Role name must be under 100 characters").optional(),
	topic: stringType().optional(),
	message: stringType().min(10, "Message must be at least 10 characters").max(2e3, "Message must be under 2000 characters")
});
function ContactPage() {
	const [formState, setFormState] = (0, import_react.useState)("idle");
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [errors, setErrors] = (0, import_react.useState)({});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formState === "loading" || formState === "success") return;
		setErrors({});
		setErrorMsg(null);
		const formElement = e.currentTarget;
		const formData = new FormData(formElement);
		const payload = {
			name: formData.get("name"),
			email: formData.get("email"),
			company: formData.get("company"),
			role: formData.get("role"),
			topic: formData.get("topic"),
			message: formData.get("message")
		};
		const validation = contactSchema.safeParse(payload);
		if (!validation.success) {
			const fieldErrors = {};
			validation.error.errors.forEach((err) => {
				if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
			});
			setErrors(fieldErrors);
			return;
		}
		setFormState("loading");
		const serviceId = "service_abyhdrr";
		const templateId = "template_djnhsqhnp";
		const publicKey = "ItL2SvR7KmqK_2Mrq";
		try {
			const templateParams = {
				from_name: validation.data.name,
				from_email: validation.data.email,
				company: validation.data.company || "Not Specified",
				message: validation.data.message,
				submitted_at: (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZoneName: "short" }),
				website: "Recursion Labs",
				name: validation.data.name,
				email: validation.data.email,
				time: (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZoneName: "short" }),
				title: "New Contact Form Submission - Recursion Labs"
			};
			await es_default.send(serviceId, templateId, templateParams, publicKey);
			setFormState("success");
			formElement.reset();
		} catch (err) {
			console.error("EmailJS Error:", err);
			setErrorMsg(err.text || err.message || "Unable to send your message. Please try again later.");
			setFormState("error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredData, { data: [breadcrumbSchema([{
		name: "Home",
		path: "/"
	}, {
		name: "Contact",
		path: "/contact"
	}]), contactPageSchema()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container-editorial pt-16 sm:pt-24 pb-16 sm:pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 sm:gap-16 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-2 lg:order-1 lg:col-span-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 sm:mt-8 font-display fluid-h2",
						children: ["Let's talk about what you're ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-primary/90",
							children: "building."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 sm:mt-10 max-w-md fluid-body-lg text-muted-foreground",
						children: "Tell us a little about the work. We reply to every serious enquiry within two business days, personally."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 sm:mt-14 space-y-5 sm:space-y-6 text-foreground/90",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									className: "mt-1 h-5 w-5 text-primary shrink-0",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-eyebrow",
									children: "Company Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${BRAND.email}`,
									className: "mt-1 block hover:text-primary transition",
									children: BRAND.email
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									className: "mt-1 h-5 w-5 text-primary shrink-0",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-eyebrow",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${BRAND.phone.replace(/\s+/g, "")}`,
									className: "mt-1 block hover:text-primary transition",
									children: BRAND.phone
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "mt-1 h-5 w-5 text-primary shrink-0",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-eyebrow",
									children: "Operational Presence"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 space-y-1 text-sm text-foreground/80",
									children: BRAND.locations.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: city }, city))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									className: "mt-1 h-5 w-5 text-primary shrink-0",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-eyebrow",
										children: "Business Hours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-foreground/80",
										children: "Monday – Friday"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "9:00 AM – 6:00 PM IST"
									})
								] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 sm:mt-14 flex flex-wrap gap-2",
						children: SOCIAL_LINKS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.href,
							className: "rounded-full border hairline px-3 py-2 text-xs hover:text-foreground text-muted-foreground transition touch-target",
							children: s.label
						}, s.label))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "order-1 lg:order-2 lg:col-span-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					onSubmit: handleSubmit,
					className: "rounded-lg border hairline bg-card/40 p-6 sm:p-8 md:p-10 space-y-8",
					"aria-label": "Contact enquiry form",
					children: formState === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						className: "py-12 sm:py-16 text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { scale: 0 },
								animate: { scale: 1 },
								transition: {
									type: "spring",
									stiffness: 200,
									damping: 15
								},
								className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "h-6 w-6",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									strokeWidth: 3,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										d: "M5 13l4 4L19 7"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow",
								children: "Received"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-display fluid-h3 text-foreground",
								children: "✓ Thank you."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-muted-foreground text-sm max-w-sm mx-auto",
								children: [
									"Your message has been received.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Our team will get back to you as soon as possible."
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8 sm:space-y-10",
						children: [
							formState === "error" && errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: -10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								className: "rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-xs text-red-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: "Unable to send your message."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1",
									children: [
										"Please try again later or contact us directly at",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `mailto:${BRAND.email}`,
											className: "underline font-medium hover:text-red-300",
											children: BRAND.email
										}),
										"."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingField, {
								label: "Full name",
								name: "name",
								required: true,
								disabled: formState === "loading",
								error: errors.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingField, {
								label: "Email address",
								name: "email",
								type: "email",
								required: true,
								disabled: formState === "loading",
								error: errors.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingField, {
								label: "Company",
								name: "company",
								disabled: formState === "loading",
								error: errors.company
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingField, {
								label: "Role",
								name: "role",
								disabled: formState === "loading",
								error: errors.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-eyebrow",
								children: "Nature of enquiry"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									"New project",
									"Advisory",
									"Partnership",
									"Careers",
									"Press"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "cursor-pointer rounded-full border hairline px-3.5 py-2 text-xs text-muted-foreground has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary transition touch-target",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "topic",
										value: t,
										className: "sr-only",
										disabled: formState === "loading"
									}), t]
								}, t))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingField, {
								label: "Tell us about the work",
								name: "message",
								textarea: true,
								required: true,
								disabled: formState === "loading",
								error: errors.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: formState === "loading",
								className: "group inline-flex w-full items-center justify-between rounded-full bg-foreground px-6 py-4 text-sm text-background hover:bg-primary hover:text-primary-foreground transition touch-target disabled:opacity-50 disabled:cursor-not-allowed",
								children: [formState === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Sending..."]
								}) : "Send enquiry", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
							})
						]
					})
				}) })
			})]
		})
	})] });
}
function FloatingField({ label, name, type = "text", required, textarea, disabled, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id: name,
			name,
			required,
			disabled,
			rows: 5,
			placeholder: " ",
			className: cn("peer w-full resize-none border-b hairline bg-transparent pt-6 pb-2 text-base text-foreground placeholder-transparent focus:border-primary focus:outline-none transition-colors disabled:opacity-50", error && "border-red-500/50 focus:border-red-500")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id: name,
			name,
			type,
			required,
			disabled,
			placeholder: " ",
			className: cn("peer w-full border-b hairline bg-transparent pt-6 pb-2 text-base min-h-[48px] text-foreground placeholder-transparent focus:border-primary focus:outline-none transition-colors disabled:opacity-50", error && "border-red-500/50 focus:border-red-500")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: name,
			className: cn("pointer-events-none absolute left-0 top-1 text-xs uppercase tracking-widest text-muted-foreground transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary", error && "text-red-500/70 peer-focus:text-red-500"),
			children: label
		})]
	});
}
//#endregion
export { ContactPage as component };
