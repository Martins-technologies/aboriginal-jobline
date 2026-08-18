import { getIcon } from "../../utils/icons";

const ringByColor = {
  "bg-primary": "border-primary/45",
  "bg-accent": "border-accent/50",
  "bg-accent-light": "border-accent-light/60",
};

export default function FeatureCard({
  feature,
  showUnderline = false,
  layout = "row",
  dashed = false,
  unboxed = false,
  bordered = false,
  className = "",
}) {
  const Icon = getIcon(feature.icon);
  const isStack = layout === "stack";
  const ringClass = feature.ringClass || ringByColor[feature.color] || "border-primary/40";
  const iconBg = feature.iconBg || feature.color;
  const iconColor = feature.iconColor || "text-white";

  const iconInner = (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor} ${
        dashed ? "h-full w-full" : isStack ? "h-12 w-12" : "h-14 w-14"
      }`}
    >
      <Icon className={isStack || dashed ? "h-5 w-5" : "h-6 w-6"} aria-hidden="true" />
    </span>
  );

  const boxClass = bordered
    ? "rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
    : unboxed
      ? ""
      : "surface-card p-6";

  return (
    <article className={`${boxClass} flex ${isStack ? "h-full flex-col" : "gap-4"} ${className}`}>
      {dashed ? (
        <span
          className={`flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-full border border-dashed p-[3px] ${ringClass}`}
        >
          {iconInner}
        </span>
      ) : (
        iconInner
      )}
      <div className={isStack ? "mt-4" : ""}>
        <h3 className={feature.titleClassName || "font-serif text-xl text-primary"}>
          {feature.title}
        </h3>
        {showUnderline ? (
          <span className="mt-2 block h-[3px] w-8 rounded-full bg-accent" aria-hidden="true" />
        ) : null}
        <p
          className={`text-sm leading-relaxed text-muted ${
            showUnderline ? "mt-3" : "mt-2"
          }`}
        >
          {feature.description}
        </p>
      </div>
    </article>
  );
}
