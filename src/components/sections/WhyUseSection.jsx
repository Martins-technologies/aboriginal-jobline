import FeatureCard from "./FeatureCard";
import PageSection from "../common/PageSection";
import { features } from "../../data/features";

export default function WhyUseSection() {
  return (
    <PageSection className="bg-topo section-pad">
      <h2 className="flex items-center justify-center gap-4 text-center text-3xl font-bold sm:text-4xl">
        <span className="hidden h-px w-16 bg-black/15 sm:block" aria-hidden="true" />
        Why Job Seekers Use Aboriginal Jobline
        <span className="hidden h-px w-16 bg-black/15 sm:block" aria-hidden="true" />
      </h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </PageSection>
  );
}
