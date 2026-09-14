import { getIcon } from "../../utils/icons";
import { popularTags } from "../../data/popularSearches";

export default function PopularSearchTags({ activeFilters, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-muted">Popular searches:</span>
      {popularTags.map((tag) => {
        const Icon = getIcon(tag.icon);
        const isActive = Object.entries(tag.query).every(
          ([key, value]) => activeFilters[key] === value,
        );

        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => onSelect(tag.query)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive
                ? "border-accent bg-accent-50 text-accent"
                : `${tag.tone} hover:bg-white`
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {tag.label}
          </button>
        );
      })}
    </div>
  );
}
