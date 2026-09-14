/**
 * DashboardTopBanner — page intro area.
 * Small eyebrow + H1 + subtitle, styled with the site's soft primary tint
 * (not the blue gradient from the reference screenshot).
 */
export default function DashboardTopBanner({ eyebrow, title, subtitle }) {
  return (
    <div className="border-b border-black/8 bg-gradient-to-br from-primary/5 to-background px-6 py-6 lg:px-8 lg:py-7">
      {eyebrow ? (
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-eyebrow text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-serif text-2xl font-bold leading-tight text-primary sm:text-3xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-1 text-sm leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
