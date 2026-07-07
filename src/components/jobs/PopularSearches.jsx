import { POPULAR_SEARCHES } from '../data/browserJobsContent'

/** Quick-filter pills below the search bar. Clicking one applies that filter. */
export default function PopularSearches({ onPick, active }) {
  const isActive = (filter) =>
    Object.entries(filter).every(([k, v]) => active[k] === v)

  return (
    <div className="bg-white pb-8 pt-16">
      <div className="container-x flex flex-wrap items-center gap-3">
        <span className="text-sm font-extrabold text-pine-800">Popular searches:</span>
        {POPULAR_SEARCHES.map(({ label, icon: Icon, filter }) => (
          <button
            key={label}
            type="button"
            onClick={() => onPick(filter)}
            aria-pressed={isActive(filter)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              isActive(filter)
                ? 'border-rust-600 bg-rust-600 text-white'
                : 'border-cream-200 bg-white text-pine-800 shadow-soft hover:border-rust-500 hover:text-rust-600'
            }`}
          >
            <Icon size={15} aria-hidden="true" /> {label}
          </button>
        ))}
      </div>
    </div>
  )
}
