import { ChevronRight } from "lucide-react";
import Button from "../common/Button";
import LeafBranch from "../common/LeafBranch";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import WaveDecoration from "../common/WaveDecoration";
import { images } from "../../data/images";

export default function MissionSection() {
  return (
    <PageSection className="bg-background section-pad overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div>
          <SectionEyebrow className="justify-start">Our Mission</SectionEyebrow>
          <h2 className="section-title mt-3">Building Stronger Futures Together</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Aboriginal Jobline exists to connect Indigenous job seekers with inclusive employers
            who value community, culture, and long-term opportunity across Canada.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            We believe meaningful employment strengthens families, Nations, and communities. Our
            platform makes it easier to find work that honours your skills, your story, and your
            future.
          </p>
          <div className="mt-6">
            <Button to="/about-us" variant="primary" icon={ChevronRight} iconPosition="right">
              Learn More About Us
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <LeafBranch className="pointer-events-none absolute -left-8 -top-8 z-0 h-32 w-28 text-accent-light sm:h-40 sm:w-36" />
          <div className="relative z-10 overflow-hidden rounded-[28px] shadow-card">
            <img
              src={images.mission.src}
              alt={images.mission.alt}
              className="aspect-[5/4] h-full w-full object-cover object-[center_35%]"
            />
          </div>
          <WaveDecoration
            variant="hero"
            size="md"
            className="pointer-events-none absolute -right-6 -bottom-8 z-20"
          />
        </div>
      </div>
    </PageSection>
  );
}
