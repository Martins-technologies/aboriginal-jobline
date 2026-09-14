import FeatureCard from "../sections/FeatureCard";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import { whyEmployersChooseHome } from "../../data/whyEmployersChooseHome";

export default function WhyEmployersChooseSection() {
  return (
    <PageSection className="bg-topo pt-5 pb-5 lg:pt-6 lg:pb-6">
      <SectionEyebrow>Why Employers Choose</SectionEyebrow>
      <h2 className="section-title mx-auto mt-2 text-center">Aboriginal Jobline</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
        {whyEmployersChooseHome.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            compact
            align="start"
          />
        ))}
      </div>
    </PageSection>
  );
}
