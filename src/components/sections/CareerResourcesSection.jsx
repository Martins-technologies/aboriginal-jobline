import ResourceCard from "./ResourceCard";
import PageSection from "../common/PageSection";
import SectionHeader from "../common/SectionHeader";
import { resources as allResources } from "../../data/resources";

const browseResourceIds = ["resume-tips", "interview-prep", "inclusive-hiring"];
const defaultResources = allResources.filter((item) => browseResourceIds.includes(item.id));

export default function CareerResourcesSection({
  resources = defaultResources,
  eyebrow = "Resources & Support",
  title = "Career Resources & Community Support",
  description = "Explore tools, programs, and support to help you succeed in your career journey.",
  className = "bg-topo section-pad",
}) {
  return (
    <PageSection id="resources" className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </PageSection>
  );
}
