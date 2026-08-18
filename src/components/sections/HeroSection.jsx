import { Search, Users } from "lucide-react";
import JobSearchBar from "../jobs/JobSearchBar";
import PopularSearchTags from "../jobs/PopularSearchTags";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import Button from "../common/Button";
import WaveDecoration from "../common/WaveDecoration";
import { images } from "../../data/images";

export default function HeroSection({ filters, onSearch, onTagSelect }) {
  return (
    <PageSection className="bg-topo overflow-hidden hero-pad" contained={false}>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[78%] sm:w-[64%] lg:w-[56%] xl:w-[52%]"
        aria-hidden="true"
      >
        <img
          src={images.heroBrowse.src}
          alt=""
          className="hero-photo-blend h-full w-full object-cover object-[68%_center] blur-[1.5px]"
        />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
        <WaveDecoration
          variant="hero"
          className="absolute -bottom-6 right-0 w-[85%] max-w-lg"
        />
      </div>

      <div className="container-page relative z-10">
        <div className="max-w-xl lg:max-w-[46%]">
          <SectionEyebrow className="justify-start">Explore Opportunities</SectionEyebrow>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl lg:text-[3.15rem]">
            <span className="block">Browse Aboriginal and</span>
            <span className="block">Indigenous Jobs</span>
            <span className="mt-1 block text-accent">Across Canada</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Discover meaningful work with inclusive employers who value Indigenous talent,
            community, and culturally safe workplaces from coast to coast to coast.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#featured-jobs" variant="primary" icon={Search}>
              Search Jobs
            </Button>
            <Button to="/employers" variant="outline" icon={Users}>
              For Employers
            </Button>
          </div>
        </div>

          <div className="relative z-20 mt-5 lg:mt-6">
          <JobSearchBar filters={filters} onSearch={onSearch} />
          <div className="mt-4">
            <PopularSearchTags activeFilters={filters} onSelect={onTagSelect} />
          </div>
        </div>
      </div>
    </PageSection>
  );
}
