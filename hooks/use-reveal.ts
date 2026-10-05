'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('[data-reveal]')
      if (targets.length === 0) return

      gsap.fromTo(
        targets,
        { y: 56, opacity: 0, rotateX: 8, transformPerspective: 1000 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            once: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
