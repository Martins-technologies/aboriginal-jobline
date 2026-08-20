import PageSection from "../common/PageSection";
import AboutEyebrow from "./AboutEyebrow";
import { aboutStoryCopy } from "../../data/aboutPage";
import { images } from "../../data/images";

function StoryArcs() {
  return (
    <svg
      className="pointer-events-none absolute -right-6 -top-6 h-28 w-28"
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="210"
        cy="10"
        r="150"
        stroke="#9E320E"
        strokeWidth="1.4"
        strokeDasharray="3 9"
        strokeLinecap="round"
      />
      <circle
        cx="210"
        cy="10"
        r="118"
        stroke="#06443D"
        strokeWidth="1.4"
        strokeDasharray="3 9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AboutStory() {
  return (
    <PageSection className="overflow-hidden bg-topo section-pad">
      <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <AboutEyebrow>{aboutStoryCopy.eyebrow}</AboutEyebrow>
          <h2 className="section-title mt-3">{aboutStoryCopy.title}</h2>
          {aboutStoryCopy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-2.5 max-w-lg text-base leading-relaxed text-body">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="relative w-full">
          <StoryArcs />
          <div className="relative z-10 overflow-hidden rounded-[20px] shadow-card">
            <img
              src={images.aboutStory.src}
              alt={images.aboutStory.alt}
              className="aspect-[16/10] h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </PageSection>
  );
}
