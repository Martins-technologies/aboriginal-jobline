import { Briefcase, Users } from "lucide-react";
import Button from "../common/Button";
import DashedDivider from "../common/DashedDivider";
import HeroBleedPhoto from "../common/HeroBleedPhoto";
import PageSection from "../common/PageSection";
import FeatureCard from "../sections/FeatureCard";
import { employerHeroFeatures } from "../../data/employerHeroFeatures";
import { images } from "../../data/images";

export default function EmployerHero() {
  return (
    <PageSection className="overflow-hidden bg-topo hero-pad" contained={false}>
      <div className="relative">
        <HeroBleedPhoto src={images.heroEmployers.src} />
        <div className="container-page relative z-10">
          <div className="flex min-h-[20rem] items-start pt-2 pb-8 lg:min-h-[24rem] lg:pt-3 lg:pb-10">
            <div className="max-w-xl lg:max-w-[46%]">
              <DashedDivider className="mb-5 justify-start" />
              <h1 className="max-w-xl font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl lg:text-[3.15rem]">
                <span className="block">Hire Aboriginal and</span>
                <span className="block">Indigenous Talent</span>
                <span className="mt-1 block text-accent">Across Canada</span>
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
                Connect with skilled Aboriginal and Indigenous job seekers across Canada. Build
                inclusive teams, strengthen communities, and post jobs easily.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/post-a-job" variant="secondary" icon={Briefcase}>
                  Post a Job
                </Button>
                <Button to="/create-employer-account" variant="outline" icon={Users}>
                  Create Employer Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page relative z-10 pb-6 lg:pb-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {employerHeroFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              layout="stack"
              dashed
              unboxed
            />
          ))}
        </div>
      </div>
    </PageSection>
  );
}
