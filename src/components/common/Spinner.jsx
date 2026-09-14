export default function Spinner({ label = "Loading", className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`} role="status">
      <span
        className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-muted">{label}…</span>
    </div>
  );
}
