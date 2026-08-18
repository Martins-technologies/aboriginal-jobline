import { MapPin } from "lucide-react";
import CategoryCard from "../categories/CategoryCard";
import RegionCard from "../categories/RegionCard";
import PopularSearchesList from "../categories/PopularSearchesList";
import JobAlertsSignup from "../categories/JobAlertsSignup";
import SectionEyebrow from "../common/SectionEyebrow";
import WaveDecoration from "../common/WaveDecoration";
import { categories } from "../../data/categories";
import { regions } from "../../data/regions";

export default function CategoryRegionSection() {
  return (
    <section id="browse-categories" className="bg-topo relative overflow-hidden py-20">
      <WaveDecoration
        variant="section"
        className="pointer-events-none absolute -right-8 top-24 hidden h-[420px] w-48 lg:block"
      />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Explore Opportunities</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Browse by Category and Region</h2>
          <p className="mt-3 text-muted">
            Find meaningful work in your field and community across Canada.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>

        <div className="mt-16">
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

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PopularSearchesList />
          <JobAlertsSignup />
        </div>
      </div>
    </section>
  );
}
