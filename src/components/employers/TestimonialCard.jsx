import { Quote } from "lucide-react";

const tones = {
  primary: {
    badge: "bg-primary",
    name: "text-primary",
    quote: "fill-primary text-primary",
  },
  accent: {
    badge: "bg-accent",
    name: "text-accent",
    quote: "fill-accent text-accent",
  },
  gold: {
    badge: "bg-accent-light",
    name: "text-accent-light",
    quote: "fill-accent-light text-accent-light",
  },
};

function getTone(testimonial) {
  if (testimonial.tone && tones[testimonial.tone]) {
    return tones[testimonial.tone];
  }
  const quoteClass = testimonial.quoteClass || "";
  if (quoteClass.includes("accent-light")) return tones.gold;
  if (quoteClass.includes("primary")) return tones.primary;
  return tones.accent;
}

export default function TestimonialCard({ testimonial, layout = "card" }) {
  const tone = getTone(testimonial);
  const quoteClass = testimonial.quoteClass || tone.quote;

  if (layout === "horizontal") {
    return (
      <article className="flex items-start gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-16 w-16 shrink-0 rounded-full object-cover object-top"
        />
        <div className="min-w-0">
          <Quote className={`h-6 w-6 ${quoteClass}`} aria-hidden="true" />
          <p className="mt-2 text-sm leading-relaxed text-muted">{testimonial.quote}</p>
          <p className="mt-3 font-sans text-sm font-semibold text-primary">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </div>
      </article>
    );
  }

  if (layout === "featured") {
    return (
      <article className="surface-card flex h-full items-center gap-5 p-6">
        <div className="min-w-0 flex-1">
          <span
            className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full ${tone.badge}`}
            aria-hidden="true"
          >
            <Quote className="h-3.5 w-3.5 fill-white text-white" />
          </span>
          <p className="text-sm leading-relaxed text-body">“{testimonial.quote}”</p>
          <p className={`mt-4 font-sans text-sm font-semibold ${tone.name}`}>{testimonial.name}</p>
          <p className={`text-xs font-medium ${tone.name}`}>{testimonial.role}</p>
        </div>
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full sm:h-[5.5rem] sm:w-[5.5rem]">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            loading="lazy"
            className={`h-full w-full object-cover ${testimonial.avatarClass || "object-center"}`}
          />
        </div>
      </article>
    );
  }

  return (
    <article className="surface-card flex h-full flex-col p-6">
      <Quote className={`h-8 w-8 ${quoteClass}`} aria-hidden="true" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{testimonial.quote}</p>
      <div className="mt-5 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-11 w-11 rounded-full object-cover object-top"
        />
        <div>
          <p className="font-sans text-sm font-semibold text-primary">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}
