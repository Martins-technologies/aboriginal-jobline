import FAQAccordion from "../common/FAQAccordion";
import PageSection from "../common/PageSection";
import SectionHeader from "../common/SectionHeader";
import { faqs } from "../../data/faqs";

export default function FAQSection() {
  return (
    <PageSection id="faq" className="bg-topo section-pad scroll-mt-20">
      <SectionHeader
        className="mb-8"
        eyebrow="FAQ"
        title="Common Questions from Job Seekers"
      />
      <FAQAccordion faqs={faqs} />
    </PageSection>
  );
}
