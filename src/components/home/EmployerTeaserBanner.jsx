import { Briefcase } from "lucide-react";
import Button from "../common/Button";
import IndustryTag from "../employers/IndustryTag";
import PageSection from "../common/PageSection";
import { employerTeaserItems } from "../../data/employerTeaserItems";

export default function EmployerTeaserBanner() {
  return (
    <PageSection className="bg-topo pb-10 pt-2 sm:pb-12">
      <div className="rounded-3xl border border-black/5 bg-[#F8EDE0] px-6 py-8 shadow-sm sm:px-10 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-2xl font-bold leading-tight text-primary sm:text-3xl">
              For Employers: Build an Inclusive Workforce
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Access a diverse pool of talented Indigenous professionals and build a stronger,
              more inclusive workplace.
            </p>
            <div className="mt-6">
              <Button to="/post-a-job" variant="secondary" icon={Briefcase}>
                Post a Job
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            {employerTeaserItems.map((item, index) => (
              <IndustryTag key={item.id} category={item} colorIndex={index} icon={item.icon} />
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
