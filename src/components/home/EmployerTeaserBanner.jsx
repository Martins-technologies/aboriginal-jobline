import { Briefcase } from "lucide-react";
import Button from "../common/Button";
import IndustryTag from "../employers/IndustryTag";
import PageSection from "../common/PageSection";
import { employerTeaserItems } from "../../data/employerTeaserItems";

export default function EmployerTeaserBanner() {
  return (
    <PageSection className="bg-topo pb-6 pt-0 lg:pb-6">
      <div className="rounded-3xl border border-black/5 bg-[#F8EDE0] px-5 py-5 shadow-sm sm:px-8 sm:py-6 lg:px-10 lg:py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl font-bold leading-tight text-primary sm:text-3xl">
              For Employers: Build an Inclusive Workforce
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Access a diverse pool of talented Indigenous professionals and build a stronger,
              more inclusive workplace.
            </p>
            <div className="mt-4">
              <Button to="/post-a-job" variant="secondary" icon={Briefcase}>
                Post a Job
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:shrink-0">
            {employerTeaserItems.map((item, index) => (
              <IndustryTag
                key={item.id}
                category={item}
                colorIndex={index}
                icon={item.icon}
                to={item.to}
              />
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
