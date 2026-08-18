import { getIcon } from "../../utils/icons";
import { popularTags } from "../../data/popularSearches";

export default function PopularSearchTags({ activeFilters, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted">Popular searches:</span>
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
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "border-accent bg-accent-50 text-accent"
                : "border-black/10 bg-white text-body hover:border-primary/30"
            }`}
          >
            <Icon className={`h-3.5 w-3.5 ${isActive ? "text-accent" : "text-primary"}`} />
            {tag.label}
          </button>
        );
      })}
    </div>
  );
}
