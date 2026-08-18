import ResourceCard from "./ResourceCard";
import SectionEyebrow from "../common/SectionEyebrow";
import { resources } from "../../data/resources";

export default function CareerResourcesSection() {
  return (
    <section id="resources" className="bg-topo py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Resources & Support</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Career Resources & Community Support
          </h2>
          <p className="mt-3 text-muted">
            Explore tools, programs, and support to help you succeed in your career journey.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
