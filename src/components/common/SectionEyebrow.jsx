export default function SectionEyebrow({
  children,
  className = "",
  endRule = true,
  tone = "accent",
}) {
  const tones = {
    accent: "text-accent",
    gold: "text-accent-light",
    white: "text-white",
  };
  const bars = {
    accent: "bg-accent/70",
    gold: "bg-accent-light/80",
    white: "bg-white/70",
  };

  return (
    <p
      className={`flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-eyebrow ${tones[tone] || tones.accent} ${className}`}
    >
      <span className={`h-px w-8 ${bars[tone] || bars.accent}`} aria-hidden="true" />
      {children}
      {endRule ? <span className={`h-px w-8 ${bars[tone] || bars.accent}`} aria-hidden="true" /> : null}
    </p>
  );
}
