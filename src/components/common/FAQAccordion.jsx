import { useState } from "react";
import { ChevronDown, HelpCircle, Minus, Plus } from "lucide-react";
import { getIcon } from "../../utils/icons";

const accentClasses = {
  orange: "bg-accent text-white",
  teal: "bg-primary text-white",
  gold: "bg-accent-light text-white",
};

export default function FAQAccordion({ faqs, variant = "grid" }) {
  const [openId, setOpenId] = useState(null);
  const isList = variant === "list";
  const isFlat = variant === "flat";
  const hasItemIcons = isFlat && faqs.some((faq) => faq.icon);

  return (
    <div
      className={
        hasItemIcons
          ? "divide-y divide-black/10 border-y border-black/10"
          : isFlat
            ? "space-y-3"
            : isList
              ? "divide-y divide-black/10 border-y border-black/10"
              : "grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      }
    >
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        const FaqIcon = faq.icon ? getIcon(faq.icon) : null;
        const iconTone = accentClasses[faq.accent] || accentClasses.orange;

        return (
          <div key={faq.id} className={isList || hasItemIcons ? "" : "surface-card"}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq.id}`}
              id={`faq-button-${faq.id}`}
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className={`flex w-full items-center gap-3 text-left ${
                isList || hasItemIcons ? "px-1 py-4" : "px-4 py-4"
              }`}
            >
              {isFlat ? (
                FaqIcon ? (
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconTone}`}
                    aria-hidden="true"
                  >
                    <FaqIcon className="h-4 w-4" />
                  </span>
                ) : (
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white"
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                )
              ) : isList ? null : (
                <HelpCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              )}
              <span
                className={`flex-1 font-medium ${
                  isFlat ? "text-base text-primary" : isList ? "text-base text-body" : "text-sm text-body"
                }`}
              >
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
                className={`text-sm leading-relaxed text-muted ${
                  hasItemIcons
                    ? "px-1 pb-4 pl-[3.25rem]"
                    : isFlat
                      ? "px-4 pb-4 pl-[3.25rem]"
                      : isList
                        ? "px-1 pb-4"
                        : "px-4 pb-4"
                }`}
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
