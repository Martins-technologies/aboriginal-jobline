import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "../../utils/icons";

const accents = {
  teal: {
    iconWrap: "bg-primary-50 text-primary",
    title: "text-primary",
    arrow: "text-primary hover:text-primary/80",
  },
  orange: {
    iconWrap: "bg-accent-50 text-accent",
    title: "text-accent",
    arrow: "text-accent hover:text-accent/80",
  },
};

export default function QuickLinkCard({ item }) {
  const Icon = getIcon(item.icon);
  const tone = accents[item.accent] || accents.teal;

  return (
    <article className="surface-card flex h-full flex-col p-6">
      <span
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${tone.iconWrap}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className={`font-sans text-lg font-semibold ${tone.title}`}>{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
      <Link
        to={item.href}
        aria-label={`Learn more about ${item.title}`}
        className={`mt-4 ml-auto inline-flex rounded-full p-1 ${tone.arrow}`}
      >
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </article>
  );
}
