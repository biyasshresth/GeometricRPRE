'use client'

import { Quote } from 'lucide-react'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import { useReveal } from '@/hooks/use-reveal'
import { TESTIMONIALS } from '@/common/header-footer/data/data'


export default function WhatOurClientSay() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section id="testimonials" ref={sectionRef} className="relative overflow-hidden py-24 md:py-36">
      {/* Floating decorative geometry */}
      <div
        className="pointer-events-none absolute top-[10%] right-[6%] size-20 rotate-12 rounded-xl border border-primary/15"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
          description="Long-term partnerships are our favorite metric. Here is what a few of them think."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <div key={testimonial.name} data-reveal className={i === 1 ? 'md:mt-10' : ''}>
              <TiltCard
                intensity={5}
                className="flex h-full flex-col rounded-2xl border border-border bg-background p-8 transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/8"
              >
                <Quote className="size-7 text-accent" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-pretty text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className="flex size-10 items-center justify-center rounded-full bg-secondary font-serif text-sm font-medium text-secondary-foreground"
                    aria-hidden="true"
                  >
                    {testimonial.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </footer>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
