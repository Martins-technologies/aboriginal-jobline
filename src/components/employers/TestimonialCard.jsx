import { Quote } from "lucide-react";

export default function TestimonialCard({ testimonial, layout = "card" }) {
  const quoteClass = testimonial.quoteClass || "fill-accent text-accent";

  if (layout === "horizontal") {
    return (
      <article className="flex items-start gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
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

  return (
    <article className="surface-card flex h-full flex-col p-6">
      <Quote className={`h-8 w-8 ${quoteClass}`} aria-hidden="true" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{testimonial.quote}</p>
      <div className="mt-5 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <p className="font-sans text-sm font-semibold text-primary">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}
