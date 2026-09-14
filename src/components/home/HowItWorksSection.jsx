import { ChevronRight } from "lucide-react";
import HowItWorksStep from "../employers/HowItWorksStep";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import { homeHowItWorksSteps } from "../../data/homeHowItWorksSteps";

export default function HowItWorksSection() {
  return (
    <PageSection className="bg-topo pt-6 pb-4 lg:pt-7 lg:pb-5">
      <SectionEyebrow>How Aboriginal Jobline Works</SectionEyebrow>
      <h2 className="sr-only">How Aboriginal Jobline Works</h2>
      <div className="mt-5 grid gap-8 sm:grid-cols-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-4">
        {homeHowItWorksSteps.map((step, index) => (
          <div key={step.number} className="contents">
            <HowItWorksStep step={step} variant="stacked" />
            {index < homeHowItWorksSteps.length - 1 ? (
              <div className="mt-7 hidden items-center justify-center lg:flex" aria-hidden="true">
                <span className="h-px w-10 border-t border-dashed border-muted/70" />
                <ChevronRight className="h-5 w-5 shrink-0 text-muted/70" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </PageSection>
  );
}
