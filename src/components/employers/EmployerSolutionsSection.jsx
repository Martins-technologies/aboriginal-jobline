import { Link } from "react-router-dom";
import { Briefcase, Users } from "lucide-react";
import Button from "../common/Button";
import InlineCTABar from "../common/InlineCTABar";
import PageSection from "../common/PageSection";
import WaveDecoration from "../common/WaveDecoration";
import IndustryTag from "./IndustryTag";
import SolutionCard from "./SolutionCard";
import TestimonialCard from "./TestimonialCard";
import { categories } from "../../data/categories";
import { employerSolutions } from "../../data/employerSolutions";
import { testimonials } from "../../data/testimonials";

const hiringIndustrySlugs = [
  "office-administration",
  "skilled-trades",
  "healthcare",
  "hospitality",
  "transportation",
  "community-services",
];

const hiringIndustries = hiringIndustrySlugs
  .map((slug) => categories.find((category) => category.slug === slug))
  .filter(Boolean);

function DashHeading({ children, className = "section-title" }) {
  return (
    <h2 className={`flex items-center gap-3 font-serif font-bold leading-tight text-primary ${className}`}>
      <span className="h-[3px] w-8 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </h2>
  );
}

export default function EmployerSolutionsSection() {
  return (
    <PageSection className="bg-topo" contained={false}>
      <div className="container-page section-pad pb-8">
        <DashHeading>Employer Solutions for Inclusive Hiring</DashHeading>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Tools and support to help your organization attract, engage, and hire Aboriginal
          and Indigenous talent across Canada.
        </p>

        <div className="relative mt-8 overflow-hidden pb-6">
          <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {employerSolutions.map((item) => (
              <SolutionCard key={item.id} item={item} />
            ))}
          </div>
          <WaveDecoration
            variant="hero"
            size="sm"
            className="pointer-events-none absolute -right-8 -bottom-10 z-10 hidden md:block"
          />
        </div>

        <div className="mt-10">
          <DashHeading className="text-2xl sm:text-3xl">
            Industries Hiring Now
          </DashHeading>
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-5">
            {hiringIndustries.map((category, index) => (
              <div key={category.slug} className="flex items-center">
                {index > 0 ? (
                  <span
                    className="mx-4 hidden h-8 w-px bg-black/10 sm:block"
                    aria-hidden="true"
                  />
                ) : null}
                <IndustryTag
                  category={category}
                  colorIndex={index}
                  icon={category.slug === "office-administration" ? "monitor" : category.icon}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
          <div>
            <DashHeading className="text-3xl sm:text-4xl">
              Trusted by Employers Across Canada
            </DashHeading>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              Organizations of all sizes trust Aboriginal Jobline to help them build diverse
              teams and stronger communities.
            </p>
            <div className="mt-6">
              <Button to="/contact" variant="primary" icon={Users}>
                Talk to Our Team
              </Button>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>

      <InlineCTABar
        text="Ready to build a stronger, more inclusive workforce?"
        actions={[
          <Button key="post" to="/post-a-job" variant="secondary" icon={Briefcase}>
            Post a Job Today
          </Button>,
          <Link
            key="learn"
            to="/employer-resources"
            className="text-sm font-semibold text-white underline decoration-white/70 underline-offset-4 hover:decoration-white"
          >
            Learn More About Our Solutions →
          </Link>,
        ]}
      />
    </PageSection>
  );
}
