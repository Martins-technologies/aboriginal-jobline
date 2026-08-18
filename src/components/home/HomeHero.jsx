import { Search, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import PageSection from "../common/PageSection";
import WaveDecoration from "../common/WaveDecoration";
import JobSearchBar from "../jobs/JobSearchBar";
import FeatureCard from "../sections/FeatureCard";
import { homeHeroFeatures } from "../../data/homeHeroFeatures";
import { images } from "../../data/images";
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
    <PageSection className="bg-topo overflow-hidden pt-5 pb-8 lg:pt-6 lg:pb-10" contained={false}>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[78%] sm:w-[64%] lg:w-[56%] xl:w-[52%]"
        aria-hidden="true"
      >
        <img
          src={images.heroHome.src}
          alt=""
          fetchPriority="high"
          className="hero-photo-blend h-full w-full object-cover object-[72%_center]"
        />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
        <WaveDecoration variant="hero" className="absolute -bottom-6 right-0 w-[85%] max-w-lg" />
      </div>

      <div className="container-page relative z-10">
        <div className="max-w-xl lg:max-w-[46%]">
          <h1 className="font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl lg:text-[3.15rem]">
            <span className="block">Find Aboriginal and Indigenous Jobs</span>
            <span className="mt-1 block text-accent">Across Canada</span>
          </h1>
          <span className="mt-4 block h-[5px] w-16 rounded-full bg-accent" aria-hidden="true" />
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Connecting Aboriginal talent with inclusive employers and meaningful career
            opportunities.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/browse-jobs" variant="primary" icon={Search}>
              Browse Jobs
            </Button>
            <Button to="/employers" variant="outline" icon={UserPlus}>
              For Employers
            </Button>
          </div>
        </div>

        <div className="relative z-20 mt-8 lg:mt-10">
          <JobSearchBar variant="compact" onSearch={handleSearch} />
        </div>

        <div className="relative z-10 mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {homeHeroFeatures.map((feature) => (
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
