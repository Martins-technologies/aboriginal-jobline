export default function FlankedHeading({ as: Tag = "h3", children, className = "" }) {
  return (
    <Tag
      className={`flex items-center justify-center gap-3 text-center font-sans text-base font-bold text-primary sm:text-lg ${className}`}
    >
      <span className="font-sans font-semibold text-accent" aria-hidden="true">
        —
      </span>
      <span>{children}</span>
      <span className="font-sans font-semibold text-accent" aria-hidden="true">
        —
      </span>
    </Tag>
  );
}
