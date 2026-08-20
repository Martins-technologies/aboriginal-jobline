import { Briefcase, Handshake, Search } from "lucide-react";
import Button from "../common/Button";
import PageSection from "../common/PageSection";

function GreenWaves() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 180C180 120 280 40 460 70c140 24 180 110 340 90 140-18 200-80 400-50v110H0V180Z"
        fill="#0B5A52"
        opacity="0.45"
      />
      <path
        d="M200 220C280 140 420 80 580 110c140 26 160 90 320 70 120-16 180-60 300-30v70H200Z"
        fill="#0D635A"
        opacity="0.35"
      />
    </svg>
  );
}

export default function AboutClosingCTA() {
  return (
    <PageSection contained={false} className="about-cta bg-[#00564F] py-5 text-white lg:py-5">
      <div className="container-page relative overflow-hidden px-8 sm:px-10 lg:px-12">
        <GreenWaves />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
              <Handshake className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <div className="max-w-lg">
              <h2 className="font-serif text-xl font-bold text-white sm:text-2xl">
                Ready to Take the Next Step?
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-white/90 sm:text-sm">
                Explore job opportunities or connect with inclusive employers who value your talent.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button to="/browse-jobs" variant="white" icon={Search}>
              Browse Jobs
            </Button>
            <Button to="/post-a-job" variant="outline-white" icon={Briefcase}>
              Post a Job
            </Button>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
