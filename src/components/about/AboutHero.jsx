import PageSection from "../common/PageSection";
import { aboutHeroCopy } from "../../data/aboutPage";
import { images } from "../../data/images";

export default function AboutHero() {
  return (
    <PageSection className="bg-topo section-pad">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent">
            {aboutHeroCopy.eyebrow}
          </p>
          <span className="mt-2 block h-px w-10 bg-accent" aria-hidden="true" />
          <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl lg:text-[3.15rem]">
            {aboutHeroCopy.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-1 block text-accent">{aboutHeroCopy.accentTitle}</span>
          </h1>
          <span className="mt-5 block h-[5px] w-16 rounded-full bg-primary" aria-hidden="true" />
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
