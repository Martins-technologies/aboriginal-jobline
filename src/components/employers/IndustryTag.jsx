import { Link } from "react-router-dom";
import { getIcon } from "../../utils/icons";
import { buildJobsPath } from "../../utils/jobs";

const circleColors = ["bg-primary", "bg-accent", "bg-accent-light"];

export default function IndustryTag({ category, colorIndex = 0, icon, to }) {
  const Icon = getIcon(icon || category.icon);
  const color = circleColors[colorIndex % circleColors.length];
  const href = to || (category.slug ? buildJobsPath({ category: category.slug }) : undefined);
  const className = `group flex items-center gap-3 rounded-2xl border border-black/10 bg-white/90 px-3.5 py-2.5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:shadow-md ${
    href ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" : ""
  }`;

  const content = (
    <>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-xs transition-transform duration-200 group-hover:scale-105 ${color}`}
      >
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold text-primary transition-colors group-hover:text-accent whitespace-nowrap">
        {category.title}
      </span>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={className} aria-label={`Browse ${category.title} jobs`}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
