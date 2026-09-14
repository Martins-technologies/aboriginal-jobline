import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ResourceCard({ resource, showTag = true, variant = "stacked" }) {
  const isSplit = variant === "split";

  return (
    <Link
      to={resource.href}
      aria-label={`Read more: ${resource.title}`}
      className={`flex h-full overflow-hidden rounded-2xl bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        isSplit
          ? "flex-col shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl xl:flex-row xl:items-stretch"
          : "surface-card flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          isSplit
            ? "aspect-[4/3] w-full xl:aspect-auto xl:min-h-[220px] xl:w-1/2"
            : "aspect-[4/3] w-full bg-background"
        }`}
      >
        <img
          src={resource.image}
          alt={resource.imageAlt || ""}
          loading="lazy"
          className={`${
            isSplit
              ? "absolute inset-0 h-full w-full object-cover object-center"
              : "h-full w-full object-contain object-center"
          } ${resource.imageClass || ""}`}
        />
        {showTag ? (
          <span
            className={`absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-full px-3 py-1 text-[10px] font-extrabold uppercase leading-tight tracking-wider text-white shadow-md ${resource.tagColor}`}
          >
            {resource.tag}
          </span>
        ) : null}
      </div>
      <div
        className={`flex flex-1 flex-col bg-white ${
          isSplit
            ? "justify-center p-5 xl:w-1/2 xl:py-6"
            : "p-4 sm:p-5"
        }`}
      >
        <h3
          className={`leading-snug text-primary ${
            isSplit
              ? "font-sans text-[15px] font-extrabold sm:text-base"
              : "font-sans text-base font-bold"
          }`}
        >
          {resource.title}
        </h3>
        <p
          className={`mt-2 flex-1 leading-relaxed ${
            isSplit ? "text-sm text-[#666]" : "text-sm text-muted"
          }`}
        >
          {resource.description}
        </p>
        <span
          className={`mt-4 inline-flex items-center gap-1 self-start text-sm font-bold text-accent ${
            isSplit ? "gap-1.5" : ""
          }`}
        >
          Read More
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
