import { Briefcase, User } from "lucide-react";
import Button from "../common/Button";
import DottedArcs from "../common/DottedArcs";
import PageSection from "../common/PageSection";
import SectionWaveDivider from "../common/SectionWaveDivider";
import FeatureCard from "../sections/FeatureCard";
import { images } from "../../data/images";
import { postJobHeroFeatures } from "../../data/postJobHeroFeatures";

export default function PostJobHero() {
  return (
    <PageSection className="bg-topo overflow-hidden pt-5 lg:pt-8" contained={false}>
      <DottedArcs />
      <div className="container-page relative z-10 pb-8 lg:pb-10">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <div>
            <h1 className="max-w-xl font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl lg:text-[3.15rem]">
              Post a Job and Reach Indigenous Talent Across Canada
            </h1>
            <span className="mt-4 block h-[5px] w-16 rounded-full bg-accent" aria-hidden="true" />
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              Connect with skilled Aboriginal and Indigenous job seekers, promote inclusive hiring,
              and fill roles faster with a simple job posting process.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#job-posting-form" variant="secondary" icon={Briefcase}>
                Start Posting
              </Button>
              <Button to="/create-employer-account" variant="outline" icon={User}>
                Employer Sign Up
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="overflow-hidden rounded-[28px] shadow-card">
              <img
                src={images.heroPostJob.src}
                alt={images.heroPostJob.alt}
                fetchPriority="high"
                className="aspect-[5/4] h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {postJobHeroFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} bordered />
          ))}
        </div>
      </div>

      <SectionWaveDivider />
    </PageSection>
  );
}
