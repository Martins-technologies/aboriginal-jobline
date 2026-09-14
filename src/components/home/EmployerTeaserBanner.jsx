import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import PageSection from "../common/PageSection";
import { getIcon } from "../../utils/icons";
import { employerTeaserItems } from "../../data/employerTeaserItems";

const iconColors = ["bg-primary", "bg-accent", "bg-accent-light"];

function EmployerBenefit({ item, index }) {
  const Icon = getIcon(item.icon);

  return (
    <Link
      to={item.to}
      aria-label={item.title}
      className={`flex items-center gap-4 rounded-xl py-3 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:px-8 ${
        index > 0 ? "lg:border-l lg:border-black/20" : ""
      }`}
    >
      <span
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white ${iconColors[index]}`}
      >
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <span className="font-sans text-base font-bold text-primary sm:text-lg">
        {item.title}
      </span>
    </Link>
  );
}

export default function EmployerTeaserBanner() {
  return (
    <PageSection className="bg-topo section-pad">
      <div className="rounded-3xl border border-black/10 bg-[#F8EDE0] px-6 py-6 shadow-sm sm:px-10 lg:px-12 lg:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
          <div className="max-w-xl lg:w-[48%]">
            <h2 className="font-serif text-3xl font-bold leading-[1.12] text-primary sm:text-4xl lg:text-[2.75rem]">
              For Employers: Build an Inclusive Workforce
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Access a diverse pool of talented Indigenous professionals and build a stronger,
              more inclusive workplace.
            </p>
            <div className="mt-6">
              <Button to="/post-a-job" variant="secondary" icon={Briefcase}>
                Post a Job
              </Button>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 lg:flex-1 lg:grid-cols-3 lg:gap-0">
            {employerTeaserItems.map((item, index) => (
              <EmployerBenefit key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
