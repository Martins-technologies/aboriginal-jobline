import LeafBranch from "./LeafBranch";

export default function InlineCTABar({ text, actions = [], className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-primary ${className}`}>
      <LeafBranch className="pointer-events-none absolute -left-4 top-1/2 h-28 w-24 -translate-y-1/2 text-white sm:left-2" />
      <div className="container-page relative flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:py-6">
        <p className="max-w-xl font-serif text-lg leading-snug text-white sm:pl-16 sm:text-xl">
          {text}
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:justify-end">
          {actions}
        </div>
      </div>
    </div>
  );
}
