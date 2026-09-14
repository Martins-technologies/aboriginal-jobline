import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ResourceCard({ resource, showTag = true }) {
  return (
    <Link
      to={resource.href}
      aria-label={`Read more: ${resource.title}`}
      className="surface-card flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 bg-background">
        <img
          src={resource.image}
          alt={resource.imageAlt || ""}
          loading="lazy"
          className="h-full w-full object-contain object-center"
        />
        {showTag ? (
          <span
            className={`absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase leading-tight tracking-wide text-white ${resource.tagColor}`}
          >
            {resource.tag}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-sans text-base font-bold leading-snug text-primary">
          {resource.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {resource.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-accent">
          Read More
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
