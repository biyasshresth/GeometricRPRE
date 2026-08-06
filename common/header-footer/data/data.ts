export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const

export interface Service {
  title: string
  description: string
  tags: string[]
  index: string
}

export const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Web Development',
    description:
      'High-performance websites engineered with modern frameworks. Fast, accessible, and built to scale with your business.',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    index: '02',
    title: 'UI / UX Design',
    description:
      'Interfaces that feel effortless. We design systems that balance beauty and clarity, grounded in real user behavior.',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    index: '03',
    title: 'Mobile Web App',
    description:
      'Immersive WebGL experiences and refined micro-interactions that turn visitors into engaged users.',
    tags: ['Three.js', 'GSAP', 'WebGL'],
  },
  {
    index: '04',
    title: 'E-Commerce',
    description:
      'Conversion-focused storefronts with seamless checkout flows, headless architecture, and lightning-fast pages.',
    tags: ['Shopify', 'Headless', 'Stripe'],
  },
]

export interface Project {
  title: string
  category: string
  description: string
  image: string
  year: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Verdant Commerce',
    category: 'E-Commerce Platform',
    description: 'A headless storefront with sub-second page loads and a bespoke checkout experience.',
    image: '/project-ecommerce.png',
    year: '2026',
  },
  {
    title: 'Meridian Analytics',
    category: 'SaaS Dashboard',
    description: 'Real-time data visualization platform serving 40k+ daily active users.',
    image: '/project-saas.png',
    year: '2025',
  },
  {
    title: 'Olive Finance',
    category: 'Mobile Web App',
    description: 'A progressive web app for personal finance with offline-first architecture.',
    image: '/project-mobile.png',
    year: '2025',
  },
  {
    title: 'Studio Dimension',
    category: '3D Experience',
    description: 'An award-worthy WebGL portfolio with scroll-driven 3D storytelling.',
    image: '/project-webgl.png',
    year: '2026',
  },
]

export interface Reason {
  title: string
  description: string
  stat: string
  statLabel: string
}

export const REASONS: Reason[] = [
  {
    title: 'Performance First',
    description: 'Every build ships with 90+ Lighthouse scores. Speed is a feature, not an afterthought.',
    stat: '98',
    statLabel: 'Avg. Lighthouse score',
  },
  {
    title: 'Design Precision',
    description: 'Pixel-perfect execution from concept to launch, with obsessive attention to detail.',
    stat: '120+',
    statLabel: 'Projects delivered',
  },
  {
    title: 'Long-Term Partners',
    description: 'We stay after launch. Most of our clients have worked with us for over three years.',
    stat: '94%',
    statLabel: 'Client retention',
  },
  {
    title: 'Modern Stack',
    description: 'React, TypeScript, and the latest web platform features — no legacy baggage.',
    stat: '8yr',
    statLabel: 'Industry experience',
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'RPRE rebuilt our platform from the ground up. Page loads dropped from four seconds to under one, and conversions went up 38% in the first quarter.',
    name: 'Amara Chen',
    role: 'VP of Product',
    company: 'Meridian Analytics',
  },
  {
    quote:
      'The 3D hero they built for our launch got us featured in three design showcases. Their eye for detail is unlike any agency we have worked with.',
    name: 'Daniel Okafor',
    role: 'Founder',
    company: 'Studio Dimension',
  },
  {
    quote:
      'What impressed us most was the communication. Weekly demos, clean handoffs, and a codebase our internal team could actually maintain.',
    name: 'Sofia Lindqvist',
    role: 'CTO',
    company: 'Verdant Commerce',
  },
]
