import { Search, Users } from "lucide-react";
import JobSearchBar from "../jobs/JobSearchBar";
import PopularSearchTags from "../jobs/PopularSearchTags";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import Button from "../common/Button";
import { images } from "../../data/images";

export default function HeroSection({ filters, onSearch, onTagSelect }) {
  const scrollToJobs = () => {
    document.getElementById("featured-jobs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageSection className="bg-topo pt-10 pb-8 lg:pt-16 lg:pb-10">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <div>
          <SectionEyebrow className="justify-start">Explore Opportunities</SectionEyebrow>
          <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-[3.25rem]">
            Browse Aboriginal and Indigenous Jobs{" "}
            <span className="mt-1 block text-accent">Across Canada</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Discover meaningful work with inclusive employers who value Indigenous talent,
            community, and culturally safe workplaces from coast to coast to coast.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" icon={Search} onClick={scrollToJobs}>
              Search Jobs
            </Button>
            <Button to="/employers" variant="outline" icon={Users}>
              For Employers
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative z-10 overflow-hidden rounded-[28px] shadow-card">
            <img
              src={images.heroBrowse.src}
              alt={images.heroBrowse.alt}
              className="aspect-[5/4] h-full w-full object-cover object-[72%_center]"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 lg:mt-14">
        <JobSearchBar filters={filters} onSearch={onSearch} />
        <div className="mt-5">
          <PopularSearchTags activeFilters={filters} onSelect={onTagSelect} />
        </div>
      </div>
    </PageSection>
  );
}
