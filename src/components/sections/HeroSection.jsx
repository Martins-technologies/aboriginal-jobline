import { Search, Users } from "lucide-react";
import JobSearchBar from "../jobs/JobSearchBar";
import PopularSearchTags from "../jobs/PopularSearchTags";
import SectionEyebrow from "../common/SectionEyebrow";
import Button from "../common/Button";
import WaveDecoration from "../common/WaveDecoration";
import { site } from "../../data/site";

export default function HeroSection({ filters, onSearch, onTagSelect }) {
  const scrollToJobs = () => {
    document.getElementById("featured-jobs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-topo relative overflow-hidden pt-10 pb-8 lg:pt-16">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionEyebrow className="justify-start">Explore Opportunities</SectionEyebrow>
            <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
              Browse Aboriginal and Indigenous Jobs{" "}
              <span className="text-accent">Across Canada</span>
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

          <div className="relative mx-auto max-w-xl lg:max-w-none">
            <div className="relative z-10 overflow-hidden rounded-[28px] shadow-card">
              <img
                src={site.hero.image}
                alt={site.hero.imageAlt}
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
            <WaveDecoration
              variant="hero"
              className="pointer-events-none absolute -right-8 -bottom-10 z-20 w-[90%] max-w-md"
            />
          </div>
        </div>

        <div className="relative z-10 mt-14 lg:mt-16">
          <JobSearchBar filters={filters} onSearch={onSearch} />
          <div className="mt-5">
            <PopularSearchTags activeFilters={filters} onSelect={onTagSelect} />
          </div>
        </div>
      </div>
    </section>
  );
}
