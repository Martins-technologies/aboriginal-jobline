import { Briefcase, ChevronRight } from "lucide-react";
import Button from "../common/Button";
import LeafBranch from "../common/LeafBranch";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import WaveDecoration from "../common/WaveDecoration";
import FeatureCard from "../sections/FeatureCard";
import HowItWorksStep from "./HowItWorksStep";
import { whyChooseEmployer } from "../../data/whyChooseEmployer";
import { howItWorksSteps } from "../../data/howItWorksSteps";

export default function WhyChooseEmployerSection() {
  return (
    <PageSection className="bg-topo" contained={false}>
      <div className="container-page section-pad pb-8">
        <SectionEyebrow>For Employers</SectionEyebrow>
        <h2 className="section-title mx-auto mt-3 max-w-3xl text-center">
          Why Employers Choose Aboriginal{" "}
          <span className="text-accent">Jobline</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-muted">
          Hire Indigenous talent, strengthen inclusive workplaces, and reach qualified
          candidates across Canada with tools built for respectful, community-centered
          recruitment.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseEmployer.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              layout="stack"
              showUnderline
            />
          ))}
        </div>
      </div>

      <div className="bg-[#F3E6D0]/70">
        <div className="container-page py-6 sm:py-8">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-6">
            {howItWorksSteps.map((step, index) => (
              <div key={step.number} className="contents">
                <HowItWorksStep step={step} />
                {index < howItWorksSteps.length - 1 ? (
                  <ChevronRight
                    className="mt-5 hidden h-6 w-6 shrink-0 text-accent/70 lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <WaveDecoration
          variant="hero"
          size="sm"
          className="pointer-events-none absolute -bottom-6 -left-8 z-0 scale-x-[-1]"
        />
        <LeafBranch className="pointer-events-none absolute -bottom-4 -right-2 z-0 h-40 w-36 text-accent-light sm:h-48 sm:w-44" />
        <div className="container-page relative z-10 flex flex-col gap-6 py-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="section-title">Start Hiring Today</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Join employers across Canada who are building inclusive workplaces and
              stronger communities.
            </p>
          </div>
          <div className="lg:text-center">
            <Button to="/post-a-job" variant="secondary" size="lg" icon={Briefcase}>
              Post a Job
            </Button>
            <p className="mt-2 text-sm text-muted">
              It&apos;s free and only takes a few minutes.
            </p>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
