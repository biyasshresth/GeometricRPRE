'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(
        '[data-hero-line]',
        { y: 90, opacity: 0, rotateX: 20, transformPerspective: 800 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power4.out', stagger: 0.14, delay: 0.2 },
      )

      // Content drifts up and fades as user scrolls past hero
      gsap.to('[data-hero-content]', {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-svh items-center"
    >
       

      <div data-hero-content className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24">
        <div className="max-w-2xl">
          <p
            data-hero-line
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium tracking-widest text-secondary-foreground uppercase"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Digital Studio — Est. 2018
          </p>

          <h1
            data-hero-line
            className="font-serif text-5xl leading-[1.05] font-medium tracking-tight text-balance text-foreground md:text-7xl"
          >
            We craft websites with <em className="text-primary italic">depth</em> and precision.
          </h1>

          <p data-hero-line className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            RPRE is a web development studio building elegant, high-performance digital experiences
            for brands that care about the details.
          </p>

          <div data-hero-line className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-xl hover:shadow-accent/20"
            >
              View Our Work
            </a>
            <a
              href="#services"
              className="rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-accent hover:text-primary"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
        >
          Scroll
          <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
