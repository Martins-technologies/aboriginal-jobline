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
      className={`surface-card flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        compact ? "p-4" : "p-6"
      }`}
    >
      {compact ? (
        <div className="flex items-center gap-2.5">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${category.iconBg} ${category.iconColor}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="min-w-0 font-sans text-sm font-bold leading-snug text-primary">
            {category.title}
          </h3>
        </div>
      ) : (
        <>
          <span
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBg} ${category.iconColor}`}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="font-serif text-xl text-primary">{category.title}</h3>
        </>
      )}
      <p
        className={`flex-1 leading-relaxed ${
          compact ? "mt-2.5 text-[13px] text-body" : "mt-2 text-sm text-muted"
        }`}
      >
        {category.description}
      </p>
      <span
        className={`inline-flex items-center gap-1 text-sm font-semibold text-accent ${
          compact ? "mt-3" : "mt-4"
        }`}
      >
        Explore Jobs
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
