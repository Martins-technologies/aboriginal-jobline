import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "../../utils/icons";
import { buildJobsPath } from "../../utils/jobs";

export default function CategoryCard({ category, compact = false }) {
  const Icon = getIcon(category.icon);

  return (
    <Link
      to={buildJobsPath({ category: category.slug })}
      aria-label={`Explore ${category.title} jobs`}
      className={`surface-card flex h-full items-center gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full ${category.iconBg} ${category.iconColor} ${
          compact ? "h-11 w-11" : "h-14 w-14"
        }`}
      >
        <Icon className={compact ? "h-5 w-5" : "h-6 w-6"} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3
          className={`font-sans font-bold leading-snug text-primary ${
            compact ? "text-sm" : "text-[15px]"
          }`}
        >
          {category.title}
        </h3>
        <p
          className={`mt-1 leading-relaxed ${
            compact ? "text-[13px] text-body" : "text-[13px] text-muted"
          }`}
        >
          {category.description}
        </p>
        <span
          className={`inline-flex items-center gap-1 font-semibold text-accent ${
            compact ? "mt-2 text-[13px]" : "mt-2.5 text-sm"
          }`}
        >
          Explore Jobs
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
