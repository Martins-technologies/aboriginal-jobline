import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ResourceCard({ resource, showTag = true }) {
  return (
    <Link
      to={resource.href}
      aria-label={`Read more: ${resource.title}`}
      className="surface-card flex h-full min-h-[10.5rem] flex-col overflow-hidden sm:flex-row focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative h-40 w-full shrink-0 sm:h-auto sm:w-[42%]">
        <img
          src={resource.image}
          alt={resource.imageAlt || ""}
          loading="lazy"
          className={`h-full w-full object-cover sm:absolute sm:inset-0 ${resource.imageClass || "object-center"}`}
        />
        {showTag ? (
          <span
            className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${resource.tagColor}`}
          >
            {resource.tag}
          </span>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="font-sans text-sm font-bold leading-snug text-primary sm:text-[15px]">
          {resource.title}
        </h3>
        <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">
          {resource.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 self-start text-sm font-semibold text-accent sm:mt-auto sm:self-end">
          Read More
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
