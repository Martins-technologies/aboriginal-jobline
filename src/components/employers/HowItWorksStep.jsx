import { getIcon } from "../../utils/icons";

export default function HowItWorksStep({ step, variant = "inline", layout }) {
  const Icon = getIcon(step.icon);
  const mode = layout || variant;

  if (mode === "card") {
    return (
      <article className="relative h-full rounded-2xl border border-black/10 bg-white px-5 pb-6 pt-8 shadow-sm">
        <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
          {step.number}
        </span>
        <div className="flex flex-col items-center text-center">
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full ${
              step.color || "bg-primary-50 text-primary"
            }`}
          >
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-sans text-base font-semibold text-primary">
            {step.number}. {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
        </div>
      </article>
    );
  }

  if (mode === "stacked") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <span
            className={`flex h-20 w-20 items-center justify-center rounded-full text-white ${
              step.color || "bg-primary"
            }`}
          >
            <Icon className="h-8 w-8" aria-hidden="true" />
          </span>
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-body text-xs font-bold text-white">
            {step.number}
          </span>
        </div>
        <h3 className="mt-4 font-sans text-base font-semibold text-primary">{step.title}</h3>
        <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4">
      <div className="relative shrink-0">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-sm">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {step.number}
        </span>
      </div>
      <div>
        <h3 className="font-sans text-base font-semibold text-primary">{step.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
      </div>
    </div>
  );
}
