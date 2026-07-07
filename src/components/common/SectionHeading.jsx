/** Centered heading block: — EYEBROW — + optional serif title + optional subtitle. */
export default function SectionHeading({ eyebrow, title, subtitle, className = '' }) {
  return (
    <div className={`mx-auto mb-12 max-w-2xl text-center ${className}`}>
      <p className="eyebrow eyebrow--both justify-center">{eyebrow}</p>
      {title && (
        <h2 className="mt-3 font-serif text-3xl font-bold text-pine-800 sm:text-4xl">{title}</h2>
      )}
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">{subtitle}</p>
      )}
    </div>
  )
}
