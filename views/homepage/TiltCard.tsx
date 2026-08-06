'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { cn } from '@/utils/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt angle in degrees */
  intensity?: number
  /** Scale applied on hover */
  hoverScale?: number
}

/**
 * Reusable 3D hover-tilt wrapper. The card rotates toward the cursor
 * with perspective, lifts slightly, and scales smoothly on hover.
 */
export default function TiltCard({
  children,
  className,
  intensity = 7,
  hoverScale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5

    gsap.to(card, {
      rotateY: px * intensity * 2,
      rotateX: -py * intensity * 2,
      scale: hoverScale,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.6)',
    })
  }

  return (
    <div className="perspective-1000">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn('transform-3d will-change-transform', className)}
      >
        {children}
      </div>
    </div>
  )
}
