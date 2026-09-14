import CategoryCard from "../categories/CategoryCard";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import { categories as popularCategories } from "../../data/categories";

const HOME_POPULAR_CATEGORIES = popularCategories.slice(0, 6);

export default function PopularCategoriesSection() {
  return (
    <PageSection className="bg-topo section-pad" innerClassName="!px-4 sm:!px-6 lg:!px-10 xl:!px-16">
      <SectionEyebrow>Popular Job Categories</SectionEyebrow>
      <h2 className="sr-only">Popular Job Categories</h2>
      <div className="mt-5 flex flex-nowrap items-stretch gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-3.5 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {HOME_POPULAR_CATEGORIES.map((category) => (
          <div
            key={category.slug}
            className="min-w-[11.25rem] shrink-0 flex-1 sm:min-w-[11.75rem] lg:min-w-0"
          >
            <CategoryCard category={category} compact />
          </div>
        ))}
      </div>
    </PageSection>
  );
}
