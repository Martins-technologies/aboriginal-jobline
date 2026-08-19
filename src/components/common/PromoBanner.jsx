import PageSection from "./PageSection";
import SectionEyebrow from "./SectionEyebrow";
import WaveDecoration from "./WaveDecoration";

function PhotoWaveEdge() {
  return (
    <svg
      viewBox="0 0 180 640"
      preserveAspectRatio="none"
      className="absolute inset-y-0 -left-px h-full w-24 sm:w-28 lg:w-36"
      aria-hidden="true"
    >
      <path
        d="M0 0C90 70 20 150 110 230C180 310 40 390 100 470C150 540 30 590 80 640H0Z"
        fill="#0F3D3E"
      />
      <path
        d="M0 0C90 70 20 150 110 230C180 310 40 390 100 470C150 540 30 590 80 640"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeDasharray="4 11"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

export default function PromoBanner({
  eyebrow,
  heading,
  description,
  buttons,
  image,
}) {
  return (
    <PageSection className="overflow-hidden bg-primary text-white" contained={false}>
      {image ? (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block xl:w-[42%]"
          aria-hidden="true"
        >
          <img
            src={image.src}
            alt=""
            className={`h-full w-full object-cover ${image.objectClass || "object-[center_30%]"}`}
          />
          <PhotoWaveEdge />
          <WaveDecoration
            variant="section"
            className="absolute right-0 top-0 h-full w-36 xl:w-44"
          />
        </div>
      ) : null}

      <div className="container-page relative z-10 py-4 lg:py-5">
        <div className="flex items-center">
          <div className="max-w-xl lg:max-w-[54%]">
            {eyebrow ? (
              <SectionEyebrow className="justify-start" tone="gold">
                {eyebrow}
              </SectionEyebrow>
            ) : null}
            <h2 className="mt-1.5 max-w-xl font-serif text-3xl font-bold leading-[1.15] text-white sm:text-4xl">
              {heading}
            </h2>
            {description ? (
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-white/90">{description}</p>
            ) : null}
            {buttons ? <div className="mt-4 flex flex-wrap gap-3">{buttons}</div> : null}
          </div>
        </div>

        {image ? (
          <div className="relative mx-auto mt-6 w-full max-w-md lg:hidden">
            <div className="overflow-hidden rounded-[28px]">
              <img
                src={image.src}
                alt={image.alt}
                className={`aspect-[5/4] h-full w-full object-cover ${image.objectClass || "object-[center_30%]"}`}
              />
            </div>
            <WaveDecoration
              variant="hero"
              size="md"
              className="pointer-events-none absolute -right-4 -bottom-6 z-20"
            />
          </div>
        ) : null}
      </div>
    </PageSection>
  );
}
