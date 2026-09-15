import ResourceCard from "./ResourceCard";
import PageSection from "../common/PageSection";
import SectionHeader from "../common/SectionHeader";
import { browseCareerResources } from "../../data/homeResources";

export default function CareerResourcesSection({
  resources = browseCareerResources,
  eyebrow = "Resources & Support",
  title = "Career Resources & Community Support",
  description =
    "Helpful guides, tools, and community support to help you grow your career and achieve your goals.",
  showTags = true,
  cardVariant = "stacked",
  className = "bg-topo section-pad",
}) {
  return (
    <PageSection id="resources" className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-8 grid gap-6 md:grid-cols-3 md:items-stretch">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            showTag={showTags}
            variant={cardVariant}
          />
        ))}
      </div>
    </PageSection>
  );
}
