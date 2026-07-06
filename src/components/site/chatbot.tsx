import React, { useState, useEffect, useRef } from "react";
import { Send, Trash2, X, Terminal, Sparkles, User, UserSquare2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_PROMPTS = [
  "What services do you offer?",
  "Tell me about the founders",
  "Recommend a tech stack",
  "Estimate my project",
  "Build an AI roadmap",
  "Why choose Recursive Lab?",
  "How can I contact your team?",
];

const SESSION_STORAGE_KEY = "recursion-labs-chatbot-history";

// Custom light-weight markdown parser for premium code blocks and list formatting
function formatResponseText(text: string) {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, index) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const match = part.match(/```(\w*)\n([\s\S]*?)```/);
      const lang = match ? match[1] : "";
      const code = match ? match[2] : part.slice(3, -3);
      return (
        <div key={index} className="my-3 overflow-hidden rounded-lg border hairline bg-ink/90 font-mono text-xs">
          <div className="flex items-center justify-between bg-card/60 px-4 py-2 border-b hairline text-muted-foreground text-[10px] tracking-wider uppercase font-sans">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              {lang || "Code"}
            </span>
          </div>
          <pre className="p-4 overflow-x-auto text-ivory max-w-full">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    // Process lists and inline formatting
    const lines = part.split("\n");
    const processedLines = lines.map((line, lIdx) => {
      let isBullet = false;
      let cleanLine = line;

      if (line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*")) {
        isBullet = true;
        cleanLine = line.replace(/^\s*[•\-*]\s*/, "");
      }

      // Inline codes
      cleanLine = cleanLine.replace(/`(.*?)`/g, "<code class='bg-ink/80 border hairline px-1.5 py-0.5 rounded font-mono text-xs text-primary'>$1</code>");
      // Bold
      cleanLine = cleanLine.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-foreground'>$1</strong>");
      // Italic
      cleanLine = cleanLine.replace(/\*(.*?)\*/g, "<em>$1</em>");

      if (isBullet) {
        return (
          <li key={lIdx} className="ml-4 list-disc my-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: cleanLine }} />
        );
      }

      return (
        <p key={lIdx} className="min-h-[1.25rem] my-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: cleanLine }} />
      );
    });

    return <div key={index} className="inline-block w-full">{processedLines}</div>;
  });
}

export function Chatbot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load chat history from session storage on mount
  useEffect(() => {
    const savedHistory = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    } else {
      // Trigger conversation start analytics
      console.log("[Analytics] Chat conversation started");
    }
  }, []);

  // Save chat history to session storage when modified
  const updateMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newMessages));
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    const updatedHistory = [...messages, userMsg];
    updateMessages(updatedHistory);
    setInputVal("");
    setIsLoading(true);
    setIsTyping(true);

    console.log("[Analytics] Message sent: " + text.slice(0, 30) + "...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedHistory }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      const assistantMsg: Message = { role: "assistant", content: data.content };
      updateMessages([...updatedHistory, assistantMsg]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      const errorMsg: Message = {
        role: "assistant",
        content: "I'm having trouble connecting at the moment. Please try again in a few moments.",
      };
      updateMessages([...updatedHistory, errorMsg]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    console.log("[Analytics] Suggested prompt clicked: " + prompt);
    handleSendMessage(prompt);
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear this conversation?")) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      setMessages([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-24 right-6 z-[90] flex h-[620px] w-[420px] flex-col overflow-hidden rounded-2xl border hairline bg-[#05060A]/95 shadow-2xl backdrop-blur-md max-sm:bottom-0 max-sm:right-0 max-sm:h-full max-sm:w-full max-sm:rounded-none max-sm:border-none"
    >
      {/* Glow highlight */}
      <div className="absolute -left-16 -top-16 pointer-events-none h-48 w-48 rounded-full bg-primary/20 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between border-b hairline bg-card/40 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border hairline">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-base leading-none text-foreground">Recursive AI</h3>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1.5 block">Your AI Technology Consultant</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              title="Clear Conversation"
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition cursor-pointer"
            aria-label="Close technology consultant"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Message History & Suggestions */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin"
      >
        {messages.length === 0 ? (
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <h4 className="font-display text-2xl text-foreground">Hello! I'm Recursive AI.</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I can answer questions about Recursive Lab, our services, software engineering, AI, cloud solutions, digital transformation, startup technology and product development.
              </p>
              <p className="text-xs text-primary/80">How can I help today?</p>
            </div>

            <div className="space-y-2 border-t hairline pt-6">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Suggested Questions</span>
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePromptClick(p)}
                    className="rounded-lg border hairline bg-card/30 px-3.5 py-2 text-xs text-foreground/80 text-left hover:border-primary/50 hover:bg-primary/5 transition touch-target cursor-pointer w-full"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-3 text-sm max-w-[85%]",
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border hairline text-xs",
                    m.role === "user" 
                      ? "bg-foreground/5 text-foreground" 
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={cn(
                    "rounded-xl px-4 py-3 text-foreground/90 space-y-1 shadow-sm leading-relaxed",
                    m.role === "user" 
                      ? "bg-primary/10 border border-primary/20" 
                      : "bg-card/45 border hairline"
                  )}
                >
                  {formatResponseText(m.content)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 text-sm mr-auto max-w-[85%]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border hairline bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-xl px-4 py-4 bg-card/45 border hairline flex items-center gap-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Tray */}
      <div className="border-t hairline bg-card/25 px-6 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputVal);
          }}
          className="relative flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="flex-1 rounded-full border hairline bg-background/50 px-5 py-3 pr-12 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary transition-colors disabled:opacity-50 min-h-[44px]"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 hover:bg-primary-hover disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
export default Chatbot;
