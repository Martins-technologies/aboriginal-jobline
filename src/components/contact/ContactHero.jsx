import { Mail, Phone } from "lucide-react";
import Button from "../common/Button";
import AccentHeading from "../common/AccentHeading";
import DashedDivider from "../common/DashedDivider";
import DottedArcs from "../common/DottedArcs";
import HeroBleedPhoto from "../common/HeroBleedPhoto";
import PageSection from "../common/PageSection";
import SectionWaveDivider from "../common/SectionWaveDivider";
import QuickLinkCard from "./QuickLinkCard";
import { contactInfo } from "../../data/contactInfo";
import { contactQuickLinks } from "../../data/contactQuickLinks";
import { images } from "../../data/images";

export default function ContactHero() {
  return (
    <PageSection className="overflow-hidden bg-topo hero-pad" contained={false}>
      <DottedArcs />
      <div className="relative">
        <HeroBleedPhoto src={images.heroContact.src} />
        <div className="container-page relative z-10">
          <div className="flex min-h-[20rem] items-start pt-2 pb-8 lg:min-h-[24rem] lg:pt-3 lg:pb-10">
            <div className="max-w-xl lg:max-w-[46%]">
              <DashedDivider className="mb-5 justify-start" />
              <h1 className="max-w-xl font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl lg:text-[3.15rem]">
                <span className="block">Connect With</span>
                <span className="mt-1 block text-accent">Aboriginal Jobline</span>
              </h1>
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
          </div>
        </div>
      </div>

      <div className="container-page relative z-10">
        <div className="grid gap-5 pb-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactQuickLinks.map((item) => (
            <QuickLinkCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <SectionWaveDivider className="mt-6" />
    </PageSection>
  );
}
