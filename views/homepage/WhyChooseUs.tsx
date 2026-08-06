'use client'


import { useReveal } from "@/hooks/use-reveal"
import SectionHeading from "./SectionHeading"
import TiltCard from "./TiltCard"
import { REASONS } from "@/common/header-footer/data/data"



export default function WhyChooseUs() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section id="why-us" ref={sectionRef} className="relative overflow-hidden py-24 md:py-36">
      <div
        className="pointer-events-none absolute top-[18%] -left-8 size-32 rotate-45 rounded-2xl bg-secondary"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="A studio built on craft, not shortcuts"
              description="We are a small team of engineers and designers who treat every project like our own product. No handoffs to juniors, no template shortcuts."
            />
            <a
              data-reveal
              href="#contact"
              className="inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-xl hover:shadow-accent/20"
            >
              Work With Us
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {REASONS.map((reason, i) => (
              <div key={reason.title} data-reveal className={i % 2 === 1 ? 'sm:mt-10' : ''}>
                <TiltCard
                  intensity={6}
                  className="h-full rounded-2xl border border-border bg-card p-7 transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/8"
                >
                  <p className="font-serif text-5xl font-medium text-primary">{reason.stat}</p>
                  <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                    {reason.statLabel}
                  </p>
                  <h3 className="mt-6 font-serif text-lg font-medium text-card-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
