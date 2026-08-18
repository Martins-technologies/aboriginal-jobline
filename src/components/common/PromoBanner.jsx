import PageSection from "./PageSection";
import SectionEyebrow from "./SectionEyebrow";
import WaveDecoration from "./WaveDecoration";

export default function PromoBanner({
  eyebrow,
  heading,
  description,
  buttons,
  image,
}) {
  return (
    <PageSection className="overflow-hidden bg-primary text-white" contained={false}>
      <div className="container-page grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:py-14">
        <div>
          {eyebrow ? (
            <SectionEyebrow className="justify-start">{eyebrow}</SectionEyebrow>
          ) : null}
          <h2 className="mt-3 max-w-xl font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
            {heading}
          </h2>
          {description ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">{description}</p>
          ) : null}
          {buttons ? <div className="mt-8 flex flex-wrap gap-3">{buttons}</div> : null}
        </div>

        {image ? (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative z-10 overflow-hidden rounded-[28px] shadow-card">
              <img
                src={image.src}
                alt={image.alt}
                className={`aspect-[5/4] h-full w-full object-cover ${image.objectClass || "object-[center_30%]"}`}
              />
            </div>
            <WaveDecoration
              variant="hero"
              size="md"
              className="pointer-events-none absolute -right-6 -bottom-8 z-20"
            />
          </div>
        ) : null}
      </div>
    </PageSection>
  );
}
