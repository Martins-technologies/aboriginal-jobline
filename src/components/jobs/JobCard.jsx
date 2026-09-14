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
  users: "border-primary/60 bg-primary/5 text-primary",
  "file-text": "border-accent/60 bg-accent/5 text-accent",
  heart: "border-accent-light bg-accent-light/10 text-accent-light",
  "heart-pulse": "border-accent-light bg-accent-light/10 text-accent-light",
  wrench: "border-accent/60 bg-accent/5 text-accent",
  utensils: "border-primary/60 bg-primary/5 text-primary",
  "book-open": "border-accent-light bg-accent-light/10 text-accent-light",
  globe: "border-primary/60 bg-primary/5 text-primary",
  truck: "border-accent/60 bg-accent/5 text-accent",
};

export default function JobCard({ job, layout = "grid", variant = "default" }) {
  const Icon = getIcon(job.icon);
  const isList = layout === "list";

  if (variant === "compact") {
    return (
      <article className="surface-card relative flex h-full min-h-[9.5rem] flex-col gap-3 p-4 pr-28 sm:flex-row sm:items-start lg:h-[10.5rem] lg:min-h-0">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed ${
            compactIconStyles[job.icon] || "bg-primary text-white"
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-sm font-semibold leading-snug text-primary sm:text-[15px]">
            <Link to={`/jobs/${job.id}`} className="hover:text-accent">
              {job.title}
            </Link>
          </h3>
          <div className="mt-1 flex items-center gap-x-3 whitespace-nowrap text-xs text-muted">
            <span className="inline-flex shrink-0 items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
              {job.location}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1">
              <Briefcase className="h-3 w-3 text-primary" aria-hidden="true" />
              {job.type}
            </span>
          </div>
        </div>
        <Button
          to={`/jobs/${job.id}#apply`}
          variant="secondary"
          size="sm"
          className="absolute bottom-3 right-3 shrink-0"
        >
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
          <Button to={`/jobs/${job.id}#apply`} variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
            Apply Now
          </Button>
        </div>
      </div>
    </article>
  );
}
