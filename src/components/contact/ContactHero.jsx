import { Mail, Phone } from "lucide-react";
import Button from "../common/Button";
import AccentHeading from "../common/AccentHeading";
import DottedArcs from "../common/DottedArcs";
import PageSection from "../common/PageSection";
import SectionWaveDivider from "../common/SectionWaveDivider";
import QuickLinkCard from "./QuickLinkCard";
import { contactInfo } from "../../data/contactInfo";
import { contactQuickLinks } from "../../data/contactQuickLinks";
import { images } from "../../data/images";

function HeroBadge() {
  return (
    <svg viewBox="0 0 72 72" className="h-16 w-16" aria-hidden="true">
      <circle cx="36" cy="36" r="35" fill="#0F3D3E" />
      <path d="M12 46l12-16 8 10 10-18 18 24H12Z" fill="#D9A441" />
      <path
        d="M14 52c8-4 14-1 22 1s16 4 22-2"
        fill="none"
        stroke="#7EB8B4"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 57c8-4 14-1 22 1s16 4 22-2"
        fill="none"
        stroke="#7EB8B4"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ContactHero() {
  return (
    <PageSection className="bg-topo pt-4 lg:pt-5" contained={false}>
      <DottedArcs />
      <div className="container-page relative">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <div>
            <AccentHeading as="h1" className="max-w-xl text-4xl sm:text-5xl lg:text-[3.15rem]">
              Connect With Aboriginal Jobline
            </AccentHeading>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              We’re here to help job seekers, employers, and community partners across Canada.
              Reach out for support, hiring inquiries, partnerships, or general questions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#contact-form" variant="secondary" icon={Mail}>
                Send a Message
              </Button>
              <Button href={contactInfo.phoneHref} variant="outline" icon={Phone}>
                Call Us
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl pt-8 lg:max-w-none">
            <span className="absolute left-1/2 top-8 z-20 -translate-x-1/2 -translate-y-1/2">
              <HeroBadge />
            </span>
            <div className="relative z-10 overflow-hidden rounded-[28px] shadow-card">
              <img
                src={images.heroContact.src}
                alt={images.heroContact.alt}
                className="aspect-[5/4] h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6 grid gap-5 pb-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactQuickLinks.map((item) => (
            <QuickLinkCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <SectionWaveDivider className="mt-6" />
    </PageSection>
  );
}
