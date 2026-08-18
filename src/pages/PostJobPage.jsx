import { Briefcase, Headphones } from "lucide-react";
import AccentHeading from "../components/common/AccentHeading";
import Button from "../components/common/Button";
import FAQAccordion from "../components/common/FAQAccordion";
import FlankedHeading from "../components/common/FlankedHeading";
import IconInfoCard from "../components/common/IconInfoCard";
import DottedArcs from "../components/common/DottedArcs";
import PageSection from "../components/common/PageSection";
import SectionWaveDivider from "../components/common/SectionWaveDivider";
import HowItWorksStep from "../components/employers/HowItWorksStep";
import TestimonialCard from "../components/employers/TestimonialCard";
import JobPostingForm from "../components/postjob/JobPostingForm";
import PostJobHero from "../components/postjob/PostJobHero";
import PageWithFooter from "../components/layout/PageWithFooter";
import CTABanner from "../components/sections/CTABanner";
import { postJobFooterConfig } from "../data/footerConfigs";
import { howPostingWorksSteps } from "../data/howPostingWorksSteps";
import { jobPostingSidebarInfo } from "../data/jobPostingSidebarInfo";
import { postJobFaqs } from "../data/postJobFaqs";
import { postJobTestimonials } from "../data/postJobTestimonials";

function JobPostingFormSection() {
  return (
    <PageSection id="job-posting-form" className="bg-topo scroll-mt-20" contained={false}>
      <DottedArcs />
      <div className="container-page relative section-pad">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <AccentHeading className="text-3xl sm:text-4xl lg:text-[2.5rem]">
              Create Your Job Listing
            </AccentHeading>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Fill in a few details below to get your job in front of Indigenous talent across
              Canada.
            </p>
            <div className="mt-8">
              <JobPostingForm />
            </div>
          </div>

          <div className="space-y-4">
            {jobPostingSidebarInfo.map((item) => (
              <IconInfoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <SectionWaveDivider />
    </PageSection>
  );
}

function HowPostingWorksSection() {
  return (
    <PageSection className="bg-topo overflow-hidden" contained={false}>
      <DottedArcs />
      <div className="container-page relative section-pad">
        <AccentHeading className="text-3xl sm:text-4xl lg:text-[2.5rem]">
          How Posting Works
        </AccentHeading>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Posting a job takes just a few minutes. Add your details, review the listing, and
          connect with Indigenous talent across Canada.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howPostingWorksSteps.map((step) => (
            <HowItWorksStep key={step.number} step={step} layout="card" />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-black/10 bg-white px-6 py-8 sm:px-8">
          <FlankedHeading>Trusted by Employers. Backed by Results.</FlankedHeading>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-0">
            {postJobTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={index === 0 ? "md:border-r md:border-black/10 md:pr-8" : "md:pl-8"}
              >
                <TestimonialCard testimonial={testimonial} layout="horizontal" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionWaveDivider />
    </PageSection>
  );
}

function PostJobFAQSection() {
  return (
    <PageSection className="bg-topo" contained={false}>
      <div className="container-page section-pad pb-8">
        <h2 className="section-title mb-8">Frequently Asked Questions</h2>
        <FAQAccordion faqs={postJobFaqs} variant="flat" />
      </div>
      <SectionWaveDivider />
    </PageSection>
  );
}

export default function PostJobPage() {
  return (
    <PageWithFooter config={postJobFooterConfig}>
      <PostJobHero />
      <JobPostingFormSection />
      <HowPostingWorksSection />
      <CTABanner
        theme="light"
        layout="centered"
        icon={Briefcase}
        heading="Ready to Post Your Job?"
        description="Join employers across Canada and connect with skilled Indigenous talent."
        actions={
          <>
            <Button href="#job-posting-form" variant="secondary" icon={Briefcase}>
              Post a Job Now
            </Button>
            <Button to="/contact" variant="outline" icon={Headphones}>
              Contact Support
            </Button>
          </>
        }
      />
      <PostJobFAQSection />
    </PageWithFooter>
  );
}
