import { Mail, Phone } from "lucide-react";
import Button from "../common/Button";
import AccentHeading from "../common/AccentHeading";
import { contactInfo } from "../../data/contactInfo";

export default function ContactCTAStrip() {
  return (
    <aside className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-primary px-8 py-10 text-white">
      <svg
        viewBox="0 0 280 280"
        className="pointer-events-none absolute -right-10 -bottom-16 h-64 w-64"
        aria-hidden="true"
        fill="none"
      >
        <g stroke="white" strokeWidth="1.4" strokeDasharray="2 10" strokeLinecap="round" opacity="0.28">
          <circle cx="160" cy="160" r="70" />
          <circle cx="160" cy="160" r="100" />
          <circle cx="160" cy="160" r="130" />
        </g>
      </svg>

      <div className="relative z-10 flex h-full flex-col">
        <AccentHeading as="h3" tone="white" className="text-3xl sm:text-[2rem]">
          Let’s Start the Conversation
        </AccentHeading>
        <p className="mt-4 text-base leading-relaxed text-white/80">
          Our team is here to support you. Reach out today.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={contactInfo.emailHref} variant="white" icon={Mail}>
            Email Us
          </Button>
          <Button href={contactInfo.phoneHref} variant="outline-white" icon={Phone}>
            Call Now
          </Button>
        </div>
      </div>
    </aside>
  );
}
