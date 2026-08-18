import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQAccordion({ faqs }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="surface-card">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq.id}`}
              id={`faq-button-${faq.id}`}
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left"
            >
              <HelpCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="flex-1 text-sm font-medium text-body">{faq.question}</span>
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
                className="px-4 pb-4 text-sm leading-relaxed text-muted"
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
