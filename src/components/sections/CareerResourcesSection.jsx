import ResourceCard from "./ResourceCard";
import PageSection from "../common/PageSection";
import SectionHeader from "../common/SectionHeader";
import { resources } from "../../data/resources";

export default function CareerResourcesSection() {
  return (
    <PageSection id="resources" className="bg-topo section-pad">
      <SectionHeader
        eyebrow="Resources & Support"
        title="Career Resources & Community Support"
        description="Explore tools, programs, and support to help you succeed in your career journey."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </PageSection>
  );
}
