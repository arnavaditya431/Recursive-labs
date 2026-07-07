import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND, SOCIAL_LINKS } from "@/lib/brand";
import { breadcrumbSchema, contactPageSchema, defaultMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { RecursiveFrame } from "@/components/ui/recursive-frame";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100, "Company name must be under 100 characters").optional(),
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
      message: formData.get("message") as string,
    };

    const validation = contactSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setFormState("loading");

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
        from_name: validation.data.name,
        from_email: validation.data.email,
        company: validation.data.company || "Not Specified",
        message: validation.data.message,
        submitted_at: new Date().toLocaleString("en-US", { timeZoneName: "short" }),
        website: "Recursive Lab",
        name: validation.data.name,
        email: validation.data.email,
        time: new Date().toLocaleString("en-US", { timeZoneName: "short" }),
        title: "New Contact Form Submission - Recursive Lab",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setFormState("success");
      formElement.reset();
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setErrorMsg(err.text || err.message || "Unable to send your message. Please try again later.");
      setFormState("error");
    }
  };

  return (
    <div className="bg-[var(--kagaz)] text-[var(--syahi)] min-h-screen">
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          contactPageSchema(),
        ]}
      />

      {/* Scene 1: The Opening */}
      <section className="min-h-screen flex flex-col justify-center container-editorial pt-32 pb-24 border-b border-[var(--rekha)]">
         <h1 className="text-display max-w-5xl">
            Let's talk about what <span className="italic text-[var(--nila)]">you're building.</span>
         </h1>
         <p className="text-statement text-[var(--dhul)] mt-8 max-w-2xl">
            Tell us a little about the work. We reply to every serious enquiry within two business days, personally.
         </p>
      </section>

      {/* Scene 2 & 3: Form and Alternatives */}
      <section className="container-editorial py-24 flex flex-col lg:flex-row gap-24">
         
         <div className="lg:w-[60%]">
            <p className="font-mono text-[10px] uppercase text-[var(--dhul)] tracking-widest mb-16">The Enquiry Form</p>

            <form onSubmit={handleSubmit} className="space-y-12">
               {formState === "success" ? (
                  <div className="py-24 text-center">
                    <p className="text-statement text-[var(--nila)] italic">Received.</p>
                    <p className="text-body mt-6 text-[var(--dhul)]">Your message has been received. Our team will get back to you shortly.</p>
                  </div>
               ) : (
                  <>
                     {formState === "error" && errorMsg && (
                       <p className="text-sm text-red-500 border border-red-200 p-4">{errorMsg}</p>
                     )}
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <FloatingField label="Full Name" name="name" error={errors.name} disabled={formState === "loading"} />
                       <FloatingField label="Email Address" name="email" type="email" error={errors.email} disabled={formState === "loading"} />
                     </div>
                     
                     <FloatingField label="Company (Optional)" name="company" error={errors.company} disabled={formState === "loading"} />
                     
                     <FloatingField label="Tell us about the work" name="message" textarea error={errors.message} disabled={formState === "loading"} />

                     <div className="pt-8">
                       <button
                         type="submit"
                         disabled={formState === "loading"}
                         className="inline-flex items-center gap-4 bg-[var(--syahi)] text-[var(--kagaz)] px-8 py-4 font-medium transition-transform hover:scale-[1.02] disabled:opacity-50"
                       >
                         {formState === "loading" ? (
                           <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                         ) : (
                           <><ArrowRight className="w-5 h-5" /> Submit Enquiry</>
                         )}
                       </button>
                     </div>
                  </>
               )}
            </form>
         </div>

         <div className="lg:w-[40%]">
            <p className="font-mono text-[10px] uppercase text-[var(--dhul)] tracking-widest mb-16">Other channels</p>
            
            <div className="space-y-8">
               <a href={`mailto:${BRAND.email}`} className="block group">
                  <RecursiveFrame>
                     <div className="p-8 bg-[var(--rekha)]/10 hover:bg-[var(--rekha)]/20 transition-colors">
                        <p className="font-mono text-[10px] text-[var(--nila)] mb-2">EMAIL</p>
                        <p className="text-body font-medium">{BRAND.email}</p>
                     </div>
                  </RecursiveFrame>
               </a>

               <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`} className="block group">
                  <RecursiveFrame>
                     <div className="p-8 bg-[var(--rekha)]/10 hover:bg-[var(--rekha)]/20 transition-colors">
                        <p className="font-mono text-[10px] text-[var(--nila)] mb-2">PHONE</p>
                        <p className="text-body font-medium">{BRAND.phone}</p>
                     </div>
                  </RecursiveFrame>
               </a>

               <div className="pt-8">
                  <p className="font-mono text-[10px] uppercase text-[var(--dhul)] tracking-widest mb-6">Elsewhere</p>
                  <div className="flex flex-wrap gap-4">
                     {SOCIAL_LINKS.map(s => (
                        <a key={s.label} href={s.href} className="text-body link-animated text-[var(--syahi)] inline-flex items-center gap-1">
                           {s.label} <ArrowUpRight className="w-3 h-3" />
                        </a>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Scene 4: The Closing Image */}
      <section className="w-full h-[80vh] border-t border-[var(--rekha)]">
         <img src="https://images.unsplash.com/photo-1596700078864-b52b3112bd78?auto=format&fit=crop&w=2000&q=80" alt="Indian City at Dusk" className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply" />
      </section>
    </div>
  );
}

function FloatingField({
  label,
  name,
  type = "text",
  textarea,
  disabled,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div className="relative group">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          disabled={disabled}
          rows={5}
          placeholder=" "
          className={cn(
            "peer w-full resize-y border-b border-[var(--rekha)] bg-transparent pt-6 pb-2 text-body text-[var(--syahi)] placeholder-transparent focus:outline-none focus:border-[var(--nila)] transition-colors disabled:opacity-50",
            error && "border-red-500 focus:border-red-500"
          )}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          disabled={disabled}
          placeholder=" "
          className={cn(
            "peer w-full border-b border-[var(--rekha)] bg-transparent pt-6 pb-2 text-body text-[var(--syahi)] placeholder-transparent focus:outline-none focus:border-[var(--nila)] transition-colors disabled:opacity-50",
            error && "border-red-500 focus:border-red-500"
          )}
        />
      )}
      <label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-0 top-6 text-body text-[var(--dhul)] transition-all peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[var(--nila)]",
          "peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:font-mono peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest",
          error && "text-red-500 peer-focus:text-red-500 peer-not-placeholder-shown:text-red-500"
        )}
      >
        {label}
      </label>
    </div>
  );
}
