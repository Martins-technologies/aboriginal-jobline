import { Briefcase, Users } from "lucide-react";
import Button from "../common/Button";
import DashedDivider from "../common/DashedDivider";
import PageSection from "../common/PageSection";
import WaveDecoration from "../common/WaveDecoration";
import FeatureCard from "../sections/FeatureCard";
import { employerHeroFeatures } from "../../data/employerHeroFeatures";
import { images } from "../../data/images";

export default function EmployerHero() {
  return (
    <PageSection className="bg-topo pt-5 pb-8 lg:pt-8 lg:pb-10">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <div>
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

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative z-10 overflow-hidden rounded-[28px] shadow-card">
            <img
              src={images.heroEmployers.src}
              alt={images.heroEmployers.alt}
              className="aspect-[5/4] h-full w-full object-cover object-[center_40%]"
            />
          </div>
          <WaveDecoration
            variant="hero"
            size="lg"
            className="pointer-events-none absolute -right-8 -bottom-8 z-20"
          />
        </div>
      </div>

      <div className="relative z-10 mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
    </PageSection>
  );
}
