import PageSection from "../common/PageSection";
import DashedCircleIcon from "./DashedCircleIcon";
import AboutEyebrow from "./AboutEyebrow";
import { aboutMissionCopy, aboutValues } from "../../data/aboutPage";

export default function AboutMissionValues() {
  return (
    <PageSection className="bg-topo py-8 lg:py-10">
      <div className="rounded-[28px] bg-[#F7F2ED] px-6 py-10 shadow-sm sm:px-10 lg:px-12 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.15fr)] lg:gap-12">
          <div>
            <AboutEyebrow>{aboutMissionCopy.eyebrow}</AboutEyebrow>
            <h2 className="section-title mt-3">{aboutMissionCopy.title}</h2>
            {aboutMissionCopy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2.5 max-w-lg text-base leading-relaxed text-body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="hidden w-px bg-black/10 lg:block" aria-hidden="true" />

          <div>
            <AboutEyebrow>Our Values</AboutEyebrow>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {aboutValues.map((value) => (
                <article key={value.id} className="flex gap-4">
                  <DashedCircleIcon icon={value.icon} />
                  <div>
                    <h3 className="font-sans text-base font-bold text-primary">{value.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">{value.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
