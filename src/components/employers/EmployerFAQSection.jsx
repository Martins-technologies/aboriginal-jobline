import FAQAccordion from "../common/FAQAccordion";
import PageSection from "../common/PageSection";
import SectionHeader from "../common/SectionHeader";
import { employerFaqs } from "../../data/employerFaqs";

export default function EmployerFAQSection() {
  return (
    <PageSection className="bg-topo section-pad">
      <SectionHeader
        className="mb-5"
        eyebrow="Employer FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about hiring with Aboriginal Jobline."
      />
      <FAQAccordion faqs={employerFaqs} variant="flat" />
    </PageSection>
  );
}
