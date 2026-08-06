'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import SectionHeading from './SectionHeading'
import { PROJECTS } from '@/common/header-footer/data/data'
import TiltCard from './TiltCard'


gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useReveal<HTMLElement>()
  const listRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
    const list = listRef.current
    if (!list) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: i % 2 === 0 ? 40 : 110 },
          {
            y: i % 2 === 0 ? -20 : -60,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      })
    }, list)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden   py-24 md:py-36">
      {/* Floating decorative geometry */}
      <div
        className="pointer-events-none absolute -top-10 right-[8%] size-40 rotate-12 rounded-3xl border border-primary/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[12%] left-[4%] size-24 -rotate-6 rounded-full border border-accent/20"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects that speak for themselves"
          description="A snapshot of recent collaborations across e-commerce, SaaS, and immersive 3D web."
        />

        <div ref={listRef} className="grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
          {PROJECTS.map((project) => (
            <article key={project.title} data-project-card data-reveal className="will-change-transform">
              <TiltCard
                intensity={4}
                className="group cursor-pointer rounded-2xl border border-border bg-background p-3 transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-xl">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={`${project.title} — ${project.category}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <p className="text-xs tracking-widest text-accent uppercase">{project.category}</p>
                    <h3 className="mt-1.5 font-serif text-xl font-medium text-foreground md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only">View {project.title} case study</span>
                  </span>
                </div>
              </TiltCard>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
