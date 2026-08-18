import { getIcon } from "../../utils/icons";

const tones = {
  peach: "bg-accent-50 text-accent",
  teal: "bg-primary text-white",
  gold: "bg-accent-light text-white",
};

export default function ContactInfoCard({ item }) {
  const Icon = getIcon(item.icon);
  const href = item.href;
  const ValueTag = href ? "a" : "p";

  return (
    <article className="surface-card flex items-start gap-4 p-5">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tones[item.tone] || tones.teal}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="font-sans text-base font-semibold text-primary">{item.title}</h3>
        <ValueTag
          {...(href ? { href } : {})}
          className={`mt-1 block text-sm leading-relaxed text-muted ${href ? "hover:text-primary" : ""}`}
        >
          {item.lines
            ? item.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))
            : item.value}
        </ValueTag>
      </div>
    </article>
  );
}
