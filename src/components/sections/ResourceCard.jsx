import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ResourceCard({ resource, showTag = true }) {
  return (
    <Link
      to={resource.href}
      aria-label={`Read more: ${resource.title}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
        <img
          src={resource.image}
          alt={resource.imageAlt || ""}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover object-center ${resource.imageClass || ""}`}
        />
        {showTag ? (
          <span
            className={`absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-full px-3 py-1 text-[10px] font-extrabold uppercase leading-tight tracking-wider text-white shadow-md ${resource.tagColor}`}
          >
            {resource.tag}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-center bg-white p-5">
        <h3 className="font-sans text-[15px] font-extrabold leading-snug text-primary sm:text-base">
          {resource.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#666]">
          {resource.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-bold text-accent">
          Read More
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
