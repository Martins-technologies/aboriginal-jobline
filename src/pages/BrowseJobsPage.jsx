import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HeroSection from "../components/sections/HeroSection";
import FeaturedJobsSection from "../components/sections/FeaturedJobsSection";
import CategoryRegionSection from "../components/sections/CategoryRegionSection";
import WhyUseSection from "../components/sections/WhyUseSection";
import CareerResourcesSection from "../components/sections/CareerResourcesSection";
import CTABanner from "../components/sections/CTABanner";
import FAQSection from "../components/sections/FAQSection";
import PageWithFooter from "../components/layout/PageWithFooter";
import { browseJobsFooterConfig } from "../data/footerConfigs";
import { useServiceCareJobs } from "../hooks/useServiceCareJobs";
import {
  emptyFilters,
  filterJobs,
  filtersFromSearchParams,
  searchParamsFromFilters,
  sortJobs,
} from "../utils/jobs";

export default function BrowseJobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("relevant");
  const [view, setView] = useState("grid");

  const { jobs: rawJobs, loading, error } = useServiceCareJobs({ limit: 100 });

  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  );

  const visibleJobs = useMemo(
    () => sortJobs(filterJobs(rawJobs, filters), sort),
    [rawJobs, filters, sort],
  );


  const updateFilters = (next, options = {}) => {
    const params = searchParamsFromFilters({ ...emptyFilters, ...next });
    setSearchParams(params, options);
  };

  const handleSearch = (form) => {
    updateFilters({
      ...filters,
      keyword: form.keyword,
      location: form.location,
      category: form.category,
      type: form.type,
    });
    document.getElementById("featured-jobs")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTagSelect = (query) => {
    updateFilters({ ...emptyFilters, ...query });
    document.getElementById("featured-jobs")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplyFilters = (draft) => {
    updateFilters(draft);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <PageWithFooter config={browseJobsFooterConfig}>
      <HeroSection
        filters={filters}
        onSearch={handleSearch}
        onTagSelect={handleTagSelect}
      />
      <FeaturedJobsSection
        jobs={visibleJobs}
        count={visibleJobs.length}
        filters={filters}
        sort={sort}
        view={view}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        onSortChange={setSort}
        onViewChange={setView}
        loading={loading}
        error={error}
      />
      <CategoryRegionSection />
      <WhyUseSection />
      <CareerResourcesSection showTags={false} />
      <CTABanner />
      <FAQSection />
    </PageWithFooter>
  );
}
