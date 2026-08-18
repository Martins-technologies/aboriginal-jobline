import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { popularSearches } from "../../data/popularSearches";
import { buildJobsPath } from "../../utils/jobs";

export default function PopularSearchesList() {
  return (
    <aside className="surface-card p-6">
      <h3 className="flex items-center gap-2 font-serif text-2xl text-primary">
        <Search className="h-5 w-5 text-accent" aria-hidden="true" />
        Popular Job Searches
      </h3>
      <ul className="mt-4 space-y-2">
        {popularSearches.map((item) => (
          <li key={item.id}>
            <Link
              to={buildJobsPath(item.query)}
              className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-body transition-colors hover:bg-background hover:text-primary"
            >
              <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
