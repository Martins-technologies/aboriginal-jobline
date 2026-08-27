import CategoryCard from "../categories/CategoryCard";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import { useServiceCareCategories } from "../../hooks/useServiceCareCategories";

export default function PopularCategoriesSection() {
  const { categories, loading, error } = useServiceCareCategories();

  return (
    <PageSection className="bg-topo section-pad">
      <SectionEyebrow>Popular Job Categories</SectionEyebrow>
      <h2 className="sr-only">Popular Job Categories</h2>
      {loading ? (
        <div className="mt-5 text-center text-sm text-muted">Loading categories...</div>
      ) : error ? (
        <div className="mt-5 text-center text-sm text-accent">{error}</div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3.5">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.slug} category={category} compact />
          ))}
        </div>
      )}
    </PageSection>
  );
}

