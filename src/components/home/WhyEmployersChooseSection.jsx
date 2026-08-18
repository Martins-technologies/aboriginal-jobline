import FeatureCard from "../sections/FeatureCard";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import { whyEmployersChooseHome } from "../../data/whyEmployersChooseHome";

export default function WhyEmployersChooseSection() {
  return (
    <PageSection className="bg-topo section-pad">
      <SectionEyebrow>Why Employers Choose</SectionEyebrow>
      <h2 className="section-title mx-auto mt-3 text-center">Aboriginal Jobline</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyEmployersChooseHome.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            layout="stack"
            className="items-center text-center"
          />
        ))}
      </div>
    </PageSection>
  );
}
