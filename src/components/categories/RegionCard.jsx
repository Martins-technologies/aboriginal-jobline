import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "../../utils/icons";
import { buildJobsPath } from "../../utils/jobs";

export default function RegionCard({ region }) {
  const Icon = getIcon(region.icon);

  return (
    <article className="surface-card flex h-full flex-col items-start p-5">
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="font-sans text-base font-semibold text-primary">{region.name}</h3>
      <Link
        to={buildJobsPath({ location: region.slug })}
        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
      >
        Explore Jobs
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
