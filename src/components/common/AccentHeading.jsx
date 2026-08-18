const tones = {
  primary: "text-primary",
  white: "text-white",
};

export default function AccentHeading({
  as: Tag = "h2",
  children,
  tone = "primary",
  className = "",
  barClassName = "",
}) {
  return (
    <div>
      <Tag className={`font-serif font-bold leading-tight ${tones[tone]} ${className}`}>
        {children}
      </Tag>
      <span
        className={`mt-3 block h-[5px] w-16 rounded-full bg-accent ${barClassName}`}
        aria-hidden="true"
      />
    </div>
  );
}
