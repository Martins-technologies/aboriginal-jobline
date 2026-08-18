import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "../../utils/icons";
import { buildJobsPath } from "../../utils/jobs";

export default function RegionCard({ region }) {
  const Icon = getIcon(region.icon);

  return (
    <Link
      to={buildJobsPath({ location: region.slug })}
      aria-label={`Explore jobs in ${region.name}`}
      className="surface-card flex h-full flex-col items-start p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="font-sans text-base font-semibold text-primary">{region.name}</h3>
      <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        Explore Jobs
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
