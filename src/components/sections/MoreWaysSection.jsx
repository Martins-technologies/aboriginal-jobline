import AccentHeading from "../common/AccentHeading";
import DottedArcs from "../common/DottedArcs";
import FAQAccordion from "../common/FAQAccordion";
import PageSection from "../common/PageSection";
import SectionWaveDivider from "../common/SectionWaveDivider";
import ContactCTAStrip from "../contact/ContactCTAStrip";
import QuickLinkCard from "../contact/QuickLinkCard";
import { contactFaqs } from "../../data/contactFaqs";
import { moreWaysLinks } from "../../data/moreWaysLinks";

export default function MoreWaysSection() {
  return (
    <PageSection className="bg-topo" contained={false}>
      <DottedArcs />
      <div className="container-page relative section-pad">
        <AccentHeading className="text-3xl sm:text-4xl lg:text-[2.5rem]">
          More Ways We Can Help
        </AccentHeading>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Whether you are looking for work, hiring Indigenous talent, or building a community
          partnership, our team is ready to connect you with the right next step.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {moreWaysLinks.map((item) => (
            <QuickLinkCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-2">
          <div className="surface-card h-full p-6 sm:p-8">
            <AccentHeading className="text-2xl sm:text-3xl">
              Frequently Asked Questions
            </AccentHeading>
            <div className="mt-4">
              <FAQAccordion faqs={contactFaqs} variant="list" />
            </div>
          </div>
          <ContactCTAStrip />
        </div>
      </div>
      <SectionWaveDivider />
    </PageSection>
  );
}
