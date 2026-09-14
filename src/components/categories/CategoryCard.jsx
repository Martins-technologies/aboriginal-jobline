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
        className="surface-card flex h-full min-h-[9.5rem] items-stretch gap-4 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span
          className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${category.iconBg} ${category.iconColor}`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
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
      className={`surface-card flex h-full min-w-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        compact ? "min-h-[11.5rem] flex-col p-3.5 sm:p-4" : "items-center gap-4 p-5"
      }`}
    >
      {compact ? (
        <>
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${category.iconBg} ${category.iconColor}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-2 w-full whitespace-nowrap text-[11px] font-bold leading-tight text-primary sm:text-xs lg:text-[13px]">
            {category.title}
          </h3>
          <p className="mt-2.5 flex-1 text-xs leading-relaxed text-muted sm:mt-3 sm:text-[13px]">
            {category.description}
          </p>
          <span className="mt-auto inline-flex items-center gap-1 pt-2.5 text-xs font-semibold text-accent sm:pt-3 sm:text-[13px]">
            Explore Jobs
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </span>
        </>
      ) : (
        <>
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${category.iconBg} ${category.iconColor}`}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-sans text-[15px] font-bold leading-snug text-primary">{category.title}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">{category.description}</p>
            <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
              Explore Jobs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </>
      )}
    </Link>
  );
}
