import { Search, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import PageSection from "../common/PageSection";
import JobSearchBar from "../jobs/JobSearchBar";
import FeatureCard from "../sections/FeatureCard";
import { homeHeroFeatures } from "../../data/homeHeroFeatures";
import { emptyFilters, searchParamsFromFilters } from "../../utils/jobs";

export default function HomeHero() {
  const navigate = useNavigate();

  const handleSearch = (form) => {
    const params = searchParamsFromFilters({
      ...emptyFilters,
      keyword: form.keyword,
      location: form.location,
    });
    const qs = params.toString();
    navigate(qs ? `/browse-jobs?${qs}` : "/browse-jobs");
  };

  return (
    <PageSection className="bg-topo" contained={false}>
      <div className="relative overflow-hidden hero-pad">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[78%] sm:w-[64%] lg:w-[56%] xl:w-[52%]"
          aria-hidden="true"
        >
          <img
            src="/img9.webp"
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-right"
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
        </div>

        <div className="container-page relative z-10">
          <div className="max-w-xl lg:max-w-[46%]">
            <h1 className="font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl lg:text-[3.15rem]">
              <span className="block">Find Aboriginal and Indigenous Jobs</span>
              <span className="mt-1 block text-accent">Across Canada</span>
            </h1>
            <span className="mt-3 block h-[5px] w-16 rounded-full bg-accent" aria-hidden="true" />
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
              Connecting Aboriginal talent with inclusive employers and meaningful career
              opportunities.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button to="/browse-jobs" variant="primary" icon={Search}>
                Browse Jobs
              </Button>
              <Button to="/employers" variant="outline" icon={UserPlus}>
                For Employers
              </Button>
            </div>
          </div>

          <div className="relative z-20 mt-5 lg:mt-6">
            <JobSearchBar variant="compact" onSearch={handleSearch} />
          </div>
        </div>
      </div>

      <div className="container-page py-4 lg:py-5">
        <div className="grid gap-5 md:grid-cols-3 md:gap-0">
          {homeHeroFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              dashed
              unboxed
              className={
                index === 0
                  ? "md:pr-8"
                  : index === homeHeroFeatures.length - 1
                    ? "relative md:pl-8 md:before:absolute md:before:inset-y-1 md:before:left-0 md:before:w-px md:before:bg-black/20"
                    : "relative md:px-8 md:before:absolute md:before:inset-y-1 md:before:left-0 md:before:w-px md:before:bg-black/20"
              }
            />
          ))}
        </div>
      </div>
    </PageSection>
  );
}
