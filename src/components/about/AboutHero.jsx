import PageSection from "../common/PageSection";
import DashedDivider from "../common/DashedDivider";
import { aboutHeroCopy } from "../../data/aboutPage";
import { images } from "../../data/images";

export default function AboutHero() {
  return (
    <PageSection className="bg-topo hero-pad">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <DashedDivider className="mb-5 justify-start" />
          <h1 className="font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl lg:text-[3.15rem]">
            {aboutHeroCopy.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-1 block text-accent">{aboutHeroCopy.accentTitle}</span>
          </h1>
          {aboutHeroCopy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="overflow-hidden rounded-[28px] shadow-card">
          <img
            src={images.aboutHero.src}
            alt={images.aboutHero.alt}
            className="aspect-[16/10] h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </PageSection>
  );
}
