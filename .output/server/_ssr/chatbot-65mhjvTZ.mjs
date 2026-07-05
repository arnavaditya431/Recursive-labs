import { a as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as Terminal, c as Send, i as Trash2, o as Sparkles, r as User, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chatbot-65mhjvTZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUGGESTED_PROMPTS = [
	"What services do you offer?",
	"Tell me about the founders",
	"Recommend a tech stack",
	"Estimate my project",
	"Build an AI roadmap",
	"Why choose Recursion Labs?",
	"How can I contact your team?"
];
var SESSION_STORAGE_KEY = "recursion-labs-chatbot-history";
function formatResponseText(text) {
	return text.split(/(```[\s\S]*?```)/g).map((part, index) => {
		if (part.startsWith("```") && part.endsWith("```")) {
			const match = part.match(/```(\w*)\n([\s\S]*?)```/);
			const lang = match ? match[1] : "";
			const code = match ? match[2] : part.slice(3, -3);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-3 overflow-hidden rounded-lg border hairline bg-ink/90 font-mono text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between bg-card/60 px-4 py-2 border-b hairline text-muted-foreground text-[10px] tracking-wider uppercase font-sans",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-3.5 w-3.5 text-primary" }), lang || "Code"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "p-4 overflow-x-auto text-ivory max-w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code })
				})]
			}, index);
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "inline-block w-full",
			children: part.split("\n").map((line, lIdx) => {
				let isBullet = false;
				let cleanLine = line;
				if (line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*")) {
					isBullet = true;
					cleanLine = line.replace(/^\s*[•\-*]\s*/, "");
				}
				cleanLine = cleanLine.replace(/`(.*?)`/g, "<code class='bg-ink/80 border hairline px-1.5 py-0.5 rounded font-mono text-xs text-primary'>$1</code>");
				cleanLine = cleanLine.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-foreground'>$1</strong>");
				cleanLine = cleanLine.replace(/\*(.*?)\*/g, "<em>$1</em>");
				if (isBullet) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "ml-4 list-disc my-1 leading-relaxed",
					dangerouslySetInnerHTML: { __html: cleanLine }
				}, lIdx);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-h-[1.25rem] my-1 leading-relaxed",
					dangerouslySetInnerHTML: { __html: cleanLine }
				}, lIdx);
			})
		}, index);
	});
}
function Chatbot({ onClose }) {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [inputVal, setInputVal] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	const messagesEndRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const savedHistory = sessionStorage.getItem(SESSION_STORAGE_KEY);
		if (savedHistory) setMessages(JSON.parse(savedHistory));
		else console.log("[Analytics] Chat conversation started");
	}, []);
	const updateMessages = (newMessages) => {
		setMessages(newMessages);
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newMessages));
	};
	(0, import_react.useEffect)(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);
	const handleSendMessage = async (text) => {
		if (!text.trim() || isLoading) return;
		const userMsg = {
			role: "user",
			content: text
		};
		const updatedHistory = [...messages, userMsg];
		updateMessages(updatedHistory);
		setInputVal("");
		setIsLoading(true);
		setIsTyping(true);
		console.log("[Analytics] Message sent: " + text.slice(0, 30) + "...");
		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: updatedHistory })
			});
			if (!response.ok) throw new Error("API call failed");
			const assistantMsg = {
				role: "assistant",
				content: (await response.json()).content
			};
			updateMessages([...updatedHistory, assistantMsg]);
		} catch (error) {
			console.error("Chatbot API error:", error);
			const errorMsg = {
				role: "assistant",
				content: "I'm having trouble connecting at the moment. Please try again in a few moments."
			};
			updateMessages([...updatedHistory, errorMsg]);
		} finally {
			setIsLoading(false);
			setIsTyping(false);
		}
	};
	const handlePromptClick = (prompt) => {
		console.log("[Analytics] Suggested prompt clicked: " + prompt);
		handleSendMessage(prompt);
	};
	const handleClearHistory = () => {
		if (confirm("Are you sure you want to clear this conversation?")) {
			sessionStorage.removeItem(SESSION_STORAGE_KEY);
			setMessages([]);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 30,
			scale: .95
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 30,
			scale: .95
		},
		transition: {
			duration: .3,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "fixed bottom-24 right-6 z-[90] flex h-[620px] w-[420px] flex-col overflow-hidden rounded-2xl border hairline bg-[#05060A]/95 shadow-2xl backdrop-blur-md max-sm:bottom-0 max-sm:right-0 max-sm:h-full max-sm:w-full max-sm:rounded-none max-sm:border-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-16 -top-16 pointer-events-none h-48 w-48 rounded-full bg-primary/20 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-between border-b hairline bg-card/40 px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border hairline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-semibold text-base leading-none text-foreground",
						children: "Recursion AI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground uppercase tracking-widest mt-1.5 block",
						children: "Your AI Technology Consultant"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [messages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleClearHistory,
						title: "Clear Conversation",
						className: "flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition cursor-pointer",
						"aria-label": "Close technology consultant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				className: "flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin",
				children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-2xl text-foreground",
								children: "Hello! I'm Recursion AI."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: "I can answer questions about Recursion Labs, our services, software engineering, AI, cloud solutions, digital transformation, startup technology and product development."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-primary/80",
								children: "How can I help today?"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 border-t hairline pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-wider text-muted-foreground font-mono",
							children: "Suggested Questions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2 pt-2",
							children: SUGGESTED_PROMPTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handlePromptClick(p),
								className: "rounded-lg border hairline bg-card/30 px-3.5 py-2 text-xs text-foreground/80 text-left hover:border-primary/50 hover:bg-primary/5 transition touch-target cursor-pointer w-full",
								children: p
							}, p))
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						messages.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex gap-3 text-sm max-w-[85%]", m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border hairline text-xs", m.role === "user" ? "bg-foreground/5 text-foreground" : "bg-primary/10 text-primary"),
								children: m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("rounded-xl px-4 py-3 text-foreground/90 space-y-1 shadow-sm leading-relaxed", m.role === "user" ? "bg-primary/10 border border-primary/20" : "bg-card/45 border hairline"),
								children: formatResponseText(m.content)
							})]
						}, idx)),
						isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 text-sm mr-auto max-w-[85%]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border hairline bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl px-4 py-4 bg-card/45 border hairline flex items-center gap-1.5 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2 w-2 rounded-full bg-primary/80 animate-bounce",
										style: { animationDelay: "0ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2 w-2 rounded-full bg-primary/80 animate-bounce",
										style: { animationDelay: "150ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2 w-2 rounded-full bg-primary/80 animate-bounce",
										style: { animationDelay: "300ms" }
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t hairline bg-card/25 px-6 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						handleSendMessage(inputVal);
					},
					className: "relative flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: inputVal,
						onChange: (e) => setInputVal(e.target.value),
						placeholder: "Ask anything...",
						disabled: isLoading,
						className: "flex-1 rounded-full border hairline bg-background/50 px-5 py-3 pr-12 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary transition-colors disabled:opacity-50 min-h-[44px]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !inputVal.trim() || isLoading,
						className: "absolute right-1.5 top-1/2 -translate-y-1/2 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 hover:bg-primary-hover disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
					})]
				})
			})
		]
	});
}
//#endregion
export { Chatbot, Chatbot as default };
