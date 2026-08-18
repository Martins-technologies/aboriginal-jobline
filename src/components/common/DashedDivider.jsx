export default function DashedDivider({ className = "" }) {
  return (
    <div
      className={`flex items-center gap-2 text-accent ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-8 bg-accent" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="h-2 w-2 rotate-45 bg-accent" />
      <span className="h-2 w-2 rotate-45 bg-accent" />
      <span className="h-2 w-2 rotate-45 bg-accent" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="h-px w-8 bg-accent" />
    </div>
  );
}
