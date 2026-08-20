import { Link } from "react-router-dom";
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
  compact = false,
  align = "center",
  className = "",
}) {
  const Icon = getIcon(feature.icon);
  const isStack = layout === "stack";
  const ringClass = feature.ringClass || ringByColor[feature.color] || "border-primary/40";
  const iconBg = feature.iconBg || feature.color;
  const iconColor = feature.iconColor || "text-white";
  const iconSize = dashed ? "h-full w-full" : compact || isStack ? "h-11 w-11" : "h-14 w-14";

  const iconInner = (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor} ${iconSize}`}
    >
      <Icon className={isStack || dashed || compact ? "h-5 w-5" : "h-6 w-6"} aria-hidden="true" />
    </span>
  );

  const boxClass = bordered
    ? "rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
    : unboxed
      ? ""
      : compact
        ? "surface-card p-4"
        : "surface-card p-6";

  const rowAlign = align === "start" ? "items-start" : "items-center";
  const classes = `${boxClass} flex ${isStack ? "h-full flex-col" : `${rowAlign} gap-3`} ${className}`;

  const content = (
    <>
      {dashed ? (
        <span
          className={`flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-full border border-dotted p-[5px] ${ringClass}`}
        >
          {iconInner}
        </span>
      ) : (
        iconInner
      )}
      <div className={isStack ? "mt-4" : "min-w-0"}>
        <h3 className={feature.titleClassName || "font-serif text-xl text-primary"}>
          {feature.title}
        </h3>
        {showUnderline ? (
          <span className="mt-2 block h-[3px] w-8 rounded-full bg-accent" aria-hidden="true" />
        ) : null}
        <p
          className={`leading-relaxed ${
            feature.descriptionClassName || (compact ? "text-[13px] text-body" : "text-sm text-muted")
          } ${showUnderline ? "mt-3" : isStack ? "mt-2" : "mt-1"}`}
        >
          {feature.description}
        </p>
      </div>
    </>
  );

  if (feature.to) {
    return (
      <Link
        to={feature.to}
        className={`${classes} rounded-xl transition-opacity hover:opacity-80`}
        aria-label={feature.title}
      >
        {content}
      </Link>
    );
  }

  return <article className={classes}>{content}</article>;
}
