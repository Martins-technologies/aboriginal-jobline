import { getIcon } from "../../utils/icons";

export default function FeatureCard({ feature }) {
  const Icon = getIcon(feature.icon);

  return (
    <article className="surface-card flex gap-4 p-6">
      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white ${feature.color}`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-serif text-xl text-primary">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
      </div>
    </article>
  );
}
