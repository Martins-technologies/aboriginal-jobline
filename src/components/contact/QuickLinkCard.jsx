import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "../../utils/icons";

const accents = {
  teal: {
    iconWrap: "bg-primary-50 text-primary",
    iconFilled: "bg-primary text-white",
    title: "text-primary",
    ring: "border-primary/40",
    arrow: "text-primary hover:text-primary/80",
  },
  orange: {
    iconWrap: "bg-accent-50 text-accent",
    iconFilled: "bg-accent text-white",
    title: "text-accent",
    ring: "border-accent/45",
    arrow: "text-accent hover:text-accent/80",
  },
  gold: {
    iconWrap: "bg-accent-light/20 text-accent-light",
    iconFilled: "bg-accent-light text-white",
    title: "text-accent-light",
    ring: "border-accent-light/55",
    arrow: "text-accent hover:text-accent/80",
  },
};

export default function QuickLinkCard({
  item,
  linkLabel,
  filled = false,
  dashed = false,
}) {
  const Icon = getIcon(item.icon);
  const tone = accents[item.accent] || accents.teal;
  const iconCircle = (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-full ${
        filled ? tone.iconFilled : tone.iconWrap
      }`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
  );

  return (
    <article className="surface-card flex h-full flex-col p-6">
      {dashed ? (
        <span
          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-dashed p-[3px] ${tone.ring}`}
        >
          <span
            className={`flex h-full w-full items-center justify-center rounded-full ${
              filled ? tone.iconFilled : tone.iconWrap
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        </span>
      ) : (
        <span className="mb-4">{iconCircle}</span>
      )}
      <h3 className={`font-sans text-lg font-semibold ${tone.title}`}>{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
      <Link
        to={item.href}
        aria-label={linkLabel ? `${linkLabel} about ${item.title}` : `Learn more about ${item.title}`}
        className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${tone.arrow} ${
          linkLabel ? "hover:underline" : "ml-auto rounded-full p-1"
        }`}
      >
        {linkLabel ? (
          <>
            {linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        ) : (
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        )}
      </Link>
    </article>
  );
}
