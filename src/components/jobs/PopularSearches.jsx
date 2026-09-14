import { POPULAR_SEARCHES } from '../data/browserJobsContent'

/** Quick-filter pills below the search bar. Clicking one applies that filter. */
export default function PopularSearches({ onPick, active }) {
  const isActive = (filter) =>
    Object.entries(filter).every(([k, v]) => active[k] === v)

  return (
    <div className="bg-white pb-8 pt-16 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-3">
        <span className="text-sm font-extrabold text-pine-800">Popular searches:</span>
        {POPULAR_SEARCHES.map(({ label, icon: Icon, filter }) => (
          <button
            key={label}
            type="button"
            onClick={() => onPick(filter)}
            aria-pressed={isActive(filter)}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              isActive(filter)
                ? 'bg-rust-500 text-white hover:bg-rust-600'
                : 'bg-cream-100 text-pine-800 hover:bg-rust-100 hover:text-rust-600'
            }`}
          >
            <Icon size={15} aria-hidden="true" /> {label}
          </button>
        ))}
      </div>
    </div>
  )
}