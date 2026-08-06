"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Check } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import SectionHeading from "./SectionHeading";
const CONTACT_DETAILS = [
  { icon: Mail, label: "Email", value: "hello@rpre.studio" },
  { icon: Phone, label: "Phone", value: "+1 (555) 012-3456" },
  { icon: MapPin, label: "Studio", value: "48 Willow Lane, Portland, OR" },
] as const;

export default function Contact() {
  const sectionRef = useReveal<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Get In Touch"
              title={"Let\u2019s build something with depth"}
              description="Tell us about your project. We usually respond within one business day."
            />

            <ul className="flex flex-col gap-5">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value }) => (
                <li key={label} data-reveal className="flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            {submitted ? (
              <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-serif text-2xl font-medium text-card-foreground">
                  Message sent
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Thanks for reaching out. We&apos;ll get back to you within one
                  business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-8 md:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-card-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-card-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Project Type
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="e.g. E-commerce redesign"
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground  focus:ring-2 focus:ring-ring focus:outline-none"
                  />
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us a little about your project, goals, and timeline..."
                    className="resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground  focus:ring-2 focus:ring-ring focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-7 w-full rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-xl hover:shadow-accent/20 sm:w-auto"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
