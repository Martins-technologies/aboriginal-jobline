import FAQAccordion from "../common/FAQAccordion";
import SectionEyebrow from "../common/SectionEyebrow";
import { faqs } from "../../data/faqs";

export default function FAQSection() {
  return (
    <section id="faq" className="bg-topo scroll-mt-24 py-20">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Common Questions from Job Seekers
          </h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
