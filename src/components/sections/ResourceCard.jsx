import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ResourceCard({ resource }) {
  return (
    <article className="surface-card overflow-hidden">
      <div className="relative">
        <img
          src={resource.image}
          alt={resource.imageAlt}
          loading="lazy"
          className={`h-56 w-full object-cover sm:h-64 ${resource.imageClass || "object-center"}`}
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white ${resource.tagColor}`}
        >
          {resource.tag}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-primary">{resource.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{resource.description}</p>
        <Link
          to={resource.href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
