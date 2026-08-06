'use client'

import { useReveal } from '@/hooks/use-reveal'
import { Code2, Palette, Boxes, ShoppingBag } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { SERVICES } from '@/common/header-footer/data/data'
import TiltCard from './TiltCard'

const SERVICE_ICONS = [Code2, Palette, Boxes, ShoppingBag]

export default function OurServices() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section id="services" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything your brand needs to live beautifully online"
          description="From first sketch to final deploy, we handle the full lifecycle of modern web products."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length]
            return (
              <div key={service.title} data-reveal>
                <TiltCard className="group h-full rounded-2xl border border-border bg-card p-8 transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-serif text-4xl text-border transition-colors duration-500 group-hover:text-accent/40">
                      {service.index}
                    </span>
                  </div>

                  <h3 className="mt-8 font-serif text-2xl font-medium text-card-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
