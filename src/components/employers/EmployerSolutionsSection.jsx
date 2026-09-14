import { Link } from "react-router-dom";
import { Briefcase, Users } from "lucide-react";
import Button from "../common/Button";
import InlineCTABar from "../common/InlineCTABar";
import PageSection from "../common/PageSection";
import WaveGraphic from "../common/WaveGraphic";
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

        <div className="relative mt-8 pb-6 md:pb-10">
          <WaveGraphic
            className="pointer-events-none absolute -bottom-10 -right-8 z-0 hidden w-[38%] max-w-xs opacity-90 wave-graphic-blend md:block lg:max-w-sm"
          />
          <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {employerSolutions.map((item) => (
              <SolutionCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <DashHeading className="text-2xl sm:text-3xl">
            Industries Hiring Now
          </DashHeading>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6 lg:gap-3.5">
            {hiringIndustries.map((category, index) => (
              <IndustryTag
                key={category.slug}
                category={category}
                colorIndex={index}
                icon={category.slug === "office-administration" ? "monitor" : category.icon}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-10">
          <WaveGraphic
            className="pointer-events-none absolute -right-4 bottom-0 z-0 hidden w-[32%] max-w-[15rem] opacity-90 wave-graphic-blend lg:block xl:max-w-[17rem]"
          />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-5 xl:gap-6">
            <div className="shrink-0 lg:w-[26%] lg:max-w-[17.5rem] xl:max-w-[19rem]">
              <span className="mb-3 block h-[3px] w-8 rounded-full bg-accent" aria-hidden="true" />
              <h2 className="font-serif text-2xl font-bold leading-[1.2] text-primary sm:text-3xl lg:text-[1.85rem] xl:text-[2rem]">
                Trusted by Employers Across Canada
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Organizations of all sizes trust Aboriginal Jobline to help them build diverse
                teams and stronger communities.
              </p>
              <div className="mt-5">
                <Button to="/contact" variant="primary" icon={Users}>
                  Talk to Our Team
                </Button>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-row items-stretch gap-3 overflow-x-auto pb-1 sm:gap-3.5 lg:gap-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} layout="split" />
              ))}
            </div>
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
