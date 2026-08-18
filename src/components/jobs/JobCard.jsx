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

export default function JobCard({ job, layout = "grid" }) {
  const Icon = getIcon(job.icon);
  const isList = layout === "list";

  return (
    <article
      className={`flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-card ${
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
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
