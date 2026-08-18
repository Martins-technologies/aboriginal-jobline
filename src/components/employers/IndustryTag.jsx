import { Link } from "react-router-dom";
import { getIcon } from "../../utils/icons";
import { buildJobsPath } from "../../utils/jobs";

const circleColors = ["bg-primary", "bg-accent", "bg-accent-light"];

export default function IndustryTag({ category, colorIndex = 0, icon, to }) {
  const Icon = getIcon(icon || category.icon);
  const color = circleColors[colorIndex % circleColors.length];
  const href = to || (category.slug ? buildJobsPath({ category: category.slug }) : undefined);
  const className = `flex items-center gap-3 ${
    href ? "rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" : ""
  }`;

  const content = (
    <>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${color}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold text-primary">{category.title}</span>
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
