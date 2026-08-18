import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { getIcon } from "../../utils/icons";
import { formatSalary } from "../../utils/jobs";

const iconStyles = {
  users: "bg-primary/10 text-primary",
  "file-text": "bg-accent-light/20 text-accent-light",
  heart: "bg-accent/10 text-accent",
  "heart-pulse": "bg-accent/10 text-accent",
  wrench: "bg-accent-light/20 text-accent-light",
  utensils: "bg-primary/10 text-primary",
  "book-open": "bg-accent-light/20 text-accent-light",
  globe: "bg-primary/10 text-primary",
  truck: "bg-accent/10 text-accent",
};

const compactIconStyles = {
  users: "bg-primary text-white",
  "file-text": "bg-accent text-white",
  heart: "bg-accent-light text-white",
  "heart-pulse": "bg-accent-light text-white",
  wrench: "bg-accent text-white",
  utensils: "bg-primary text-white",
  "book-open": "bg-accent-light text-white",
  globe: "bg-primary text-white",
  truck: "bg-accent text-white",
};

export default function JobCard({ job, layout = "grid", variant = "default" }) {
  const Icon = getIcon(job.icon);
  const isList = layout === "list";

  if (variant === "compact") {
    return (
      <article className="surface-card flex h-full flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            compactIconStyles[job.icon] || "bg-primary text-white"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-sm font-semibold leading-snug text-primary sm:text-[15px]">
            <Link to={`/jobs/${job.id}`} className="hover:text-accent">
              {job.title}
            </Link>
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3 w-3 text-primary" aria-hidden="true" />
              {job.type}
            </span>
          </div>
        </div>
        <Button to={`/jobs/${job.id}`} variant="secondary" size="sm" className="shrink-0 self-start sm:self-center">
          Apply Now
        </Button>
      </article>
    );
  }

  return (
    <article
      className={`surface-card flex h-full flex-col p-5 ${
        isList ? "sm:flex-row sm:items-start sm:gap-6" : ""
      }`}
    >
      <div className={`flex items-start justify-between gap-3 ${isList ? "sm:w-16 sm:shrink-0" : ""}`}>
        <span className={`flex h-12 w-12 items-center justify-center rounded-full ${iconStyles[job.icon] || "bg-primary/10 text-primary"}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {!isList ? <Badge>{job.badge}</Badge> : null}
      </div>

      <div className={`mt-4 flex flex-1 flex-col ${isList ? "sm:mt-0" : ""}`}>
        <div className={isList ? "flex items-start justify-between gap-3" : ""}>
          <div>
            <h3 className="font-serif text-xl leading-snug text-primary">
              <Link to={`/jobs/${job.id}`} className="hover:text-accent">
                {job.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted">{job.company}</p>
          </div>
          {isList ? <Badge className="hidden sm:inline-flex">{job.badge}</Badge> : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {job.type}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{job.description}</p>
        <p className="mt-3 font-sans text-base font-bold text-accent">{formatSalary(job)}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <Button to={`/jobs/${job.id}`} variant="outline" size="sm">
            View Details
          </Button>
          <Link
            to={`/jobs/${job.id}`}
            className="inline-flex items-center gap-1 rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
