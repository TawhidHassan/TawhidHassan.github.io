"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Download, Loader2, Send } from "lucide-react";
import { contactDetails, profile, socials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/GlowCard";
import { MagneticButton, Magnetic } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");

    // Compose an email the user can send from their client. Swap this for an
    // API route / form service (Resend, Formspree, etc.) when a backend exists.
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
      }, 4000);
    }, 900);
  };

  const field =
    "w-full rounded-xl border border-card-border bg-background-2/50 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <section id="contact" className="relative py-12 sm:py-28 lg:py-36">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's build something exceptional."
          description="Have a product in mind or a team to strengthen? I'm open to senior Flutter roles, consulting, and ambitious builds."
        />

        <div className="mt-10 sm:mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: details + CTA */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <GlowCard tilt={false} className="p-7">
                <h3 className="text-lg font-semibold">Contact details</h3>
                <p className="mt-2 text-sm text-muted">
                  Prefer a direct line? Reach me here.
                </p>
                <div className="mt-6 space-y-4">
                  {contactDetails.map((c) => {
                    const inner = (
                      <div className="flex items-center gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent">
                          <c.icon size={18} />
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs uppercase tracking-wide text-muted">
                            {c.label}
                          </div>
                          <div className="truncate text-sm font-medium">
                            {c.value}
                          </div>
                        </div>
                      </div>
                    );
                    return c.href ? (
                      <a
                        key={c.label}
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="block rounded-2xl p-1 transition-colors hover:bg-foreground/5"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div key={c.label} className="p-1">
                        {inner}
                      </div>
                    );
                  })}
                </div>

                <a
                  href="/Sifat_Tawhid_Hassan_CV.pdf"
                  download
                  className="mt-7 inline-flex items-center gap-2 rounded-xl border border-card-border bg-background-2/50 px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  <Download size={16} />
                  Download CV
                </a>

                <div className="mt-6 flex items-center gap-2 border-t border-card-border pt-6">
                  {socials.map((s) => (
                    <Magnetic key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid h-11 w-11 place-items-center rounded-full glass text-muted transition-colors hover:text-accent"
                      >
                        <s.icon size={17} />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </GlowCard>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-accent-2 to-accent-3 p-7 text-white">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
                <p className="text-sm font-medium uppercase tracking-widest text-white/80">
                  {profile.availability}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Ready when you are.
                </h3>
                <p className="mt-2 text-sm text-white/85">
                  Typical response time under 24 hours.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.05}>
            <GlowCard tilt={false} className="p-7 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className={field}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project…"
                    className={`${field} resize-none`}
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={status !== "idle"}
                  icon={
                    status === "sending" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : status === "sent" ? (
                      <Check size={16} />
                    ) : (
                      <Send size={16} />
                    )
                  }
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
                      {status === "sending"
                        ? "Sending…"
                        : status === "sent"
                        ? "Message ready!"
                        : "Send Message"}
                    </motion.span>
                  </AnimatePresence>
                </MagneticButton>
              </form>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
