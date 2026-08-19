import { ChevronRight } from "lucide-react";
import Button from "../common/Button";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import { images } from "../../data/images";

export default function MissionSection() {
  return (
    <PageSection className="overflow-hidden bg-background" contained={false}>
      <img
        src={images.waveGraphic.src}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-left-top select-none"
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[72%] lg:block"
        aria-hidden="true"
      >
        <img
          key={images.mission.src}
          src={images.mission.src}
          alt=""
          className="mission-photo-blend h-full w-full object-cover object-[center_center]"
        />
        <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-background to-transparent" />
      </div>

      <div className="container-page relative z-10">
        <div className="flex items-center py-5 lg:min-h-[23rem] lg:py-6">
          <div className="w-full lg:w-[32%] lg:min-w-[17.5rem] lg:max-w-[23rem]">
            <SectionEyebrow className="justify-start" endRule={false}>
              Our Mission
            </SectionEyebrow>
            <h2 className="section-title mt-2 text-[1.75rem] sm:text-3xl lg:text-[2rem]">
              Building Stronger Futures Together
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-body">
              At Aboriginal Jobline, our mission is to connect Aboriginal and Indigenous job
              seekers with inclusive employers, creating meaningful opportunities that empower
              individuals, strengthen families, and build thriving communities across Canada.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-body">
              We believe in removing barriers, celebrating diverse talents, and fostering
              workplaces where everyone can succeed.
            </p>
            <div className="mt-5">
              <Button
                to="/about-us"
                variant="primary"
                icon={ChevronRight}
                iconPosition="right"
                className="rounded-full"
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mb-5 w-full max-w-xl lg:hidden">
          <div className="overflow-hidden rounded-[28px] shadow-card">
            <img
              key={images.mission.src}
              src={images.mission.src}
              alt={images.mission.alt}
              className="aspect-[5/4] h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </PageSection>
  );
}
