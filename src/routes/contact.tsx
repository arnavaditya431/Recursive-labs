import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND, SOCIAL_LINKS } from "@/lib/brand";
import { breadcrumbSchema, contactPageSchema, defaultMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { useTheme } from "@/components/site/theme-provider";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100, "Company name must be under 100 characters").optional(),
  role: z.string().max(100, "Role name must be under 100 characters").optional(),
  topic: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must be under 2000 characters"),
});

export const Route = createFileRoute("/contact")({
  head: () =>
    defaultMeta({
      title: "Contact",
      description:
        "Start a conversation with RECURSIVE LAB. We work with founders, functional leaders, and enterprise teams on the systems that matter.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === "loading" || formState === "success") return;

    setErrors({});
    setErrorMsg(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      topic: formData.get("topic") as string,
      message: formData.get("message") as string,
    };

    // Client-side schema validation
    const validation = contactSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setFormState("loading");

    // Fetch EmailJS Keys from import.meta.env
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS environment variables.");
      setErrorMsg("Email service is currently misconfigured. Please try again later.");
      setFormState("error");
      return;
    }

    try {
      const templateParams = {
        // Required by the prompt instructions
        from_name: validation.data.name,
        from_email: validation.data.email,
        company: validation.data.company || "Not Specified",
        message: validation.data.message,
        submitted_at: new Date().toLocaleString("en-US", { timeZoneName: "short" }),
        website: "Recursive Lab",
        
        // Mapped to your actual dashboard template (shown in the screenshot) for instant compatibility
        name: validation.data.name,
        email: validation.data.email,
        time: new Date().toLocaleString("en-US", { timeZoneName: "short" }),
        title: "New Contact Form Submission - Recursive Lab",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setFormState("success");
      formElement.reset(); // Reset form elements on success
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setErrorMsg(err.text || err.message || "Unable to send your message. Please try again later.");
      setFormState("error");
    }
  };

  return (
    <div>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          contactPageSchema(),
        ]}
      />

      <section className="container-editorial pt-16 sm:pt-24 pb-16 sm:pb-24">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-12">
          {/* Left info — on mobile, shows below form; on desktop, left side */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <p className="text-eyebrow">Contact</p>
            <h1 className="mt-6 sm:mt-8 font-display fluid-h2">
              Let's talk about what you're <span className={`italic ${isLight ? 'text-warm' : 'text-primary/90'}`}>building.</span>
            </h1>
            <p className="mt-6 sm:mt-10 max-w-md fluid-body-lg text-muted-foreground">
              Tell us a little about the work. We reply to every serious enquiry within two
              business days, personally.
            </p>

            <div className="mt-10 sm:mt-14 space-y-5 sm:space-y-6 text-foreground/90">
              <div className="flex items-start gap-4">
                <Mail className={`mt-1 h-5 w-5 shrink-0 ${isLight ? 'text-warm' : 'text-primary'}`} aria-hidden="true" />
                <div>
                  <p className="text-eyebrow">Company Email</p>
                  <a href={`mailto:${BRAND.email}`} className="mt-1 block hover:text-foreground transition">
                    {BRAND.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className={`mt-1 h-5 w-5 shrink-0 ${isLight ? 'text-warm' : 'text-primary'}`} aria-hidden="true" />
                <div>
                  <p className="text-eyebrow">Phone</p>
                  <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`} className="mt-1 block hover:text-foreground transition">
                    {BRAND.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className={`mt-1 h-5 w-5 shrink-0 ${isLight ? 'text-warm' : 'text-primary'}`} aria-hidden="true" />
                <div>
                  <p className="text-eyebrow">Operational Presence</p>
                  <div className="mt-2 space-y-1 text-sm text-foreground/80">
                    {BRAND.locations.map((city) => (
                      <p key={city}>{city}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className={`mt-1 h-5 w-5 shrink-0 ${isLight ? 'text-warm' : 'text-primary'}`} aria-hidden="true" />
                <div>
                  <p className="text-eyebrow">Business Hours</p>
                  <p className="mt-1 text-sm text-foreground/80">
                    Monday – Friday
                  </p>
                  <p className="text-xs text-muted-foreground">
                    9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-14 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} className={`rounded-full border px-3 py-2 text-xs text-muted-foreground transition touch-target ${isLight ? 'border-border/50 hover:text-warm hover:border-warm' : 'hairline hover:text-foreground'}`}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal>
              <form
                onSubmit={handleSubmit}
                className={cn(
                  "rounded-2xl border p-6 sm:p-8 md:p-10 space-y-8",
                  isLight
                    ? "bg-card/60 border-border/40 shadow-theme-lg backdrop-blur-sm"
                    : "hairline bg-card/40"
                )}
                aria-label="Contact enquiry form"
              >
                {formState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 sm:py-16 text-center space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${isLight ? 'bg-warm/10 text-warm' : 'bg-primary/10 text-primary'}`}
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <p className="text-eyebrow">Received</p>
                    <p className="mt-4 font-display fluid-h3 text-foreground">✓ Thank you.</p>
                    <p className="mt-2 text-muted-foreground text-sm max-w-sm mx-auto">
                      Your message has been received.<br />
                      Our team will get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-8 sm:space-y-10">
                    {formState === "error" && errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-xs text-red-400"
                      >
                        <p className="font-semibold">Unable to send your message.</p>
                        <p className="mt-1">
                          Please try again later or contact us directly at{" "}
                          <a href={`mailto:${BRAND.email}`} className="underline font-medium hover:text-red-300">
                            {BRAND.email}
                          </a>.
                        </p>
                      </motion.div>
                    )}

                    <FloatingField 
                      label="Full name" 
                      name="name" 
                      required 
                      disabled={formState === "loading"} 
                      error={errors.name}
                      isLight={isLight}
                    />
                    
                    <FloatingField 
                      label="Email address" 
                      name="email" 
                      type="email" 
                      required 
                      disabled={formState === "loading"} 
                      error={errors.email}
                      isLight={isLight}
                    />
                    
                    <FloatingField 
                      label="Company" 
                      name="company" 
                      disabled={formState === "loading"} 
                      error={errors.company}
                      isLight={isLight}
                    />
                    
                    <FloatingField 
                      label="Role" 
                      name="role" 
                      disabled={formState === "loading"} 
                      error={errors.role}
                      isLight={isLight}
                    />

                    <div>
                      <span className="text-eyebrow">Nature of enquiry</span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["New project", "Advisory", "Partnership", "Careers", "Press"].map(
                          (t) => (
                            <label
                              key={t}
                              className={cn(
                                "cursor-pointer rounded-full border px-3.5 py-2 text-xs text-muted-foreground transition touch-target",
                                isLight
                                  ? "border-border/50 has-[:checked]:bg-warm has-[:checked]:text-warm-foreground has-[:checked]:border-warm"
                                  : "hairline has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary"
                              )}
                            >
                              <input 
                                type="radio" 
                                name="topic" 
                                value={t} 
                                className="sr-only" 
                                disabled={formState === "loading"}
                              />
                              {t}
                            </label>
                          ),
                        )}
                      </div>
                    </div>

                    <FloatingField 
                      label="Tell us about the work" 
                      name="message" 
                      textarea 
                      required 
                      disabled={formState === "loading"} 
                      error={errors.message}
                      isLight={isLight}
                    />

                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className={cn(
                        "group inline-flex w-full items-center justify-between rounded-full px-6 py-4 text-sm transition-all touch-target disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]",
                        isLight
                          ? "btn-warm shadow-theme-md"
                          : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      {formState === "loading" ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send enquiry"
                      )}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function FloatingField({
  label,
  name,
  type = "text",
  required,
  textarea,
  disabled,
  error,
  isLight,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  disabled?: boolean;
  error?: string;
  isLight?: boolean;
}) {
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          rows={5}
          placeholder=" "
          className={cn(
            "peer w-full resize-none border-b bg-transparent pt-6 pb-2 text-base text-foreground placeholder-transparent focus:outline-none transition-colors disabled:opacity-50",
            isLight ? "border-border/40 focus:border-warm" : "hairline focus:border-primary",
            error && "border-red-500/50 focus:border-red-500"
          )}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          disabled={disabled}
          placeholder=" "
          className={cn(
            "peer w-full border-b bg-transparent pt-6 pb-2 text-base min-h-[48px] text-foreground placeholder-transparent focus:outline-none transition-colors disabled:opacity-50",
            isLight ? "border-border/40 focus:border-warm" : "hairline focus:border-primary",
            error && "border-red-500/50 focus:border-red-500"
          )}
        />
      )}
      <label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-0 top-1 text-xs uppercase tracking-widest text-muted-foreground transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal",
          isLight
            ? "peer-focus:top-1 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-warm"
            : "peer-focus:top-1 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary",
          error && "text-red-500/70 peer-focus:text-red-500"
        )}
      >
        {label}
      </label>
    </div>
  );
}
