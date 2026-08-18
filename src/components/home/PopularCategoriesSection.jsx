import CategoryCard from "../categories/CategoryCard";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import { categories } from "../../data/categories";

const popularCategories = categories.slice(0, 6);

export default function PopularCategoriesSection() {
  return (
    <PageSection className="bg-topo section-pad">
      <SectionEyebrow>Popular Job Categories</SectionEyebrow>
      <h2 className="sr-only">Popular Job Categories</h2>
      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
        {popularCategories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </PageSection>
  );
}
