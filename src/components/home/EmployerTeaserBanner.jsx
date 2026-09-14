import { Briefcase } from "lucide-react";
import { Fragment } from "react";
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
      className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-1 py-2 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:gap-3.5"
    >
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white sm:h-16 sm:w-16 ${iconColors[index]}`}
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
      </span>
      <span className="min-w-0 font-sans text-sm font-bold leading-snug text-primary sm:text-base">
        {item.title}
      </span>
    </Link>
  );
}

export default function EmployerTeaserBanner() {
  return (
    <PageSection className="bg-topo section-pad">
      <div className="rounded-3xl border border-black/10 bg-[#F8EDE0] px-6 py-6 shadow-sm sm:px-10 lg:px-12 lg:py-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:gap-12">
          <div className="max-w-xl">
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

          <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:gap-0">
            {employerTeaserItems.map((item, index) => (
              <Fragment key={item.id}>
                {index > 0 && (
                  <div
                    aria-hidden="true"
                    className="h-px w-full shrink-0 bg-black/15 lg:mx-5 lg:h-16 lg:w-px"
                  />
                )}
                <EmployerBenefit item={item} index={index} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
