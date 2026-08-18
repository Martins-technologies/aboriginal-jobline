import { MapPin } from "lucide-react";
import CategoryCard from "../categories/CategoryCard";
import RegionCard from "../categories/RegionCard";
import PopularSearchesList from "../categories/PopularSearchesList";
import JobAlertsSignup from "../categories/JobAlertsSignup";
import PageSection from "../common/PageSection";
import SectionHeader from "../common/SectionHeader";
import { categories } from "../../data/categories";
import { regions } from "../../data/regions";
import { images } from "../../data/images";

export default function CategoryRegionSection() {
  return (
    <PageSection id="browse-categories" className="bg-topo section-pad scroll-mt-20 overflow-hidden" contained={false}>
      <img
        src={images.categoryGraphic.src}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-0 hidden h-[520px] w-auto max-w-[38%] object-contain object-right select-none lg:block"
      />

      <div className="container-page relative">
        <SectionHeader
          eyebrow="Explore Opportunities"
          title="Browse by Category and Region"
          description="Find meaningful work in your field and community across Canada."
        />

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>

        <div className="mt-6">
          <h3 className="mb-6 flex items-center gap-2 font-serif text-2xl text-primary">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            Browse by Region
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {regions.map((region) => (
              <RegionCard key={region.slug} region={region} />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <PopularSearchesList />
          <JobAlertsSignup />
        </div>
      </div>
    </PageSection>
  );
}
