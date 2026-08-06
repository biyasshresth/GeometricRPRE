interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14 max-w-2xl md:mb-20">
      <p
        data-reveal
        className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-widest text-accent uppercase"
      >
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        data-reveal
        className="font-serif text-3xl font-medium tracking-tight text-balance text-foreground md:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p data-reveal className="mt-5 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
