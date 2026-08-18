import { getIcon } from "../../utils/icons";

const circleColors = ["bg-primary", "bg-accent", "bg-accent-light"];

export default function IndustryTag({ category, colorIndex = 0, icon }) {
  const Icon = getIcon(icon || category.icon);
  const color = circleColors[colorIndex % circleColors.length];

  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${color}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold text-primary">{category.title}</span>
    </div>
  );
}
