export default function SectionEyebrow({ children, className = "" }) {
  return (
    <p
      className={`flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-eyebrow text-accent ${className}`}
    >
      <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
      {children}
      <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
    </p>
  );
}
