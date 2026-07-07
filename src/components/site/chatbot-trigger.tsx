import React, { useState, Suspense } from "react";
import { MessageSquare, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const Chatbot = React.lazy(() => import("./chatbot"));

export function ChatbotTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      console.log("[Analytics] Chat opened");
      setHasOpened(true);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={handleToggle}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--kagaz)] text-[var(--syahi)] border border-[var(--syahi)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform cursor-pointer touch-target focus:outline-none"
        aria-label={isOpen ? "Close technology consultant" : "Open technology consultant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Lazy Loaded Chat Widget */}
      <AnimatePresence>
        {isOpen && hasOpened && (
          <Suspense
            fallback={
              <div className="fixed bottom-24 right-6 z-[90] h-12 w-12 rounded-full border border-primary/20 bg-background/80 backdrop-blur flex items-center justify-center text-primary animate-spin">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.228 9H18.9" />
                </svg>
              </div>
            }
          >
            <Chatbot onClose={() => setIsOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}
export default ChatbotTrigger;
