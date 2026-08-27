import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "../../utils/icons";
import { buildJobsPath } from "../../utils/jobs";

export default function CategoryCard({ category, compact = false, browse = false }) {
  const Icon = getIcon(category.icon);

  if (browse) {
    return (
      <Link
        to={buildJobsPath({ category: category.slug })}
        aria-label={`Explore ${category.title} jobs`}
        className="surface-card flex min-h-[9.5rem] items-start gap-4 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:h-[11rem] lg:min-h-0"
      >
        <span
          className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${category.iconBg} ${category.iconColor}`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="font-sans text-base font-bold leading-snug text-primary">
            {category.title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">{category.description}</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[13px] font-semibold text-accent">
            Explore Jobs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={buildJobsPath({ category: category.slug })}
      aria-label={`Explore ${category.title} jobs`}
      className={`surface-card flex h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        compact ? "min-h-[12.25rem] flex-col p-4" : "items-center gap-4 p-5"
      }`}
    >
      <div className={compact ? "flex items-center gap-3" : "contents"}>
        <span
          className={`flex shrink-0 items-center justify-center rounded-full ${category.iconBg} ${category.iconColor} ${
            compact ? "h-12 w-12" : "h-14 w-14"
          }`}
        >
          <Icon className={compact ? "h-6 w-6" : "h-6 w-6"} aria-hidden="true" />
        </span>
        <h3
          className={`font-sans font-bold leading-snug text-primary ${
            compact ? "text-sm" : "text-[15px]"
          }`}
        >
          {category.title}
        </h3>
      </div>
      <div className={compact ? "flex min-h-0 flex-1 flex-col" : "min-w-0 flex-1"}>
        <p
          className={`mt-1 leading-relaxed ${
            compact ? "mt-3 text-[13px] text-body" : "text-[13px] text-muted"
          }`}
        >
          {category.description}
        </p>
        <span
          className={`inline-flex items-center gap-1 font-semibold text-accent ${
            compact ? "mt-auto pt-3 text-[13px]" : "mt-2.5 text-sm"
          }`}
        >
          Explore Jobs
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
