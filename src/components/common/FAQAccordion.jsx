import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQAccordion({ faqs, variant = "grid" }) {
  const [openId, setOpenId] = useState(null);
  const isList = variant === "list";

  return (
    <div
      className={
        isList
          ? "divide-y divide-black/10 border-y border-black/10"
          : "grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      }
    >
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className={isList ? "" : "surface-card"}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq.id}`}
              id={`faq-button-${faq.id}`}
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className={`flex w-full items-center gap-3 text-left ${
                isList ? "px-1 py-4" : "px-4 py-4"
              }`}
            >
              {isList ? null : (
                <HelpCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              )}
              <span className={`flex-1 font-medium text-body ${isList ? "text-base" : "text-sm"}`}>
                {faq.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isOpen ? (
              <p
                id={`faq-panel-${faq.id}`}
                role="region"
                aria-labelledby={`faq-button-${faq.id}`}
                className={`text-sm leading-relaxed text-muted ${isList ? "px-1 pb-4" : "px-4 pb-4"}`}
              >
                {faq.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
