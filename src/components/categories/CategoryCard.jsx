import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "../../utils/icons";
import { buildJobsPath } from "../../utils/jobs";

export default function CategoryCard({ category }) {
  const Icon = getIcon(category.icon);

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-card">
      <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBg} ${category.iconColor}`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="font-serif text-xl text-primary">{category.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{category.description}</p>
      <Link
        to={buildJobsPath({ category: category.slug })}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
      >
        Explore Jobs
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
