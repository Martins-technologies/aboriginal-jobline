export default function AboutEyebrow({ children, className = "" }) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent">{children}</p>
      <span className="mt-1.5 block h-px w-10 bg-accent" aria-hidden="true" />
    </div>
  );
}
