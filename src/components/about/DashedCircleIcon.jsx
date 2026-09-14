import { getIcon } from "../../utils/icons";

const tones = {
  accent: "border-accent text-accent",
  primary: "border-primary text-primary",
};

export default function DashedCircleIcon({ icon, tone = "accent", className = "" }) {
  const Icon = getIcon(icon);

  return (
    <span
      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed ${tones[tone] || tones.accent} ${className}`}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </span>
  );
}

