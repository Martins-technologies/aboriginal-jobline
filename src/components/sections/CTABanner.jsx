import { Search, UserPlus, Users } from "lucide-react";
import Button from "../common/Button";
import DottedArcs from "../common/DottedArcs";
import PageSection from "../common/PageSection";
import WaveDecoration from "../common/WaveDecoration";

const defaultActions = (
  <>
    <Button to="/browse-jobs" variant="outline-white" icon={Search}>
      Browse Jobs
    </Button>
    <Button to="/create-profile" variant="white" icon={UserPlus}>
      Create Profile
    </Button>
  </>
);

export default function CTABanner({
  heading = "Ready to Find Your Next Opportunity?",
  description = "Browse inclusive roles or create a free profile so employers committed to Indigenous talent can reach you first.",
  actions,
  theme = "dark",
  layout = "split",
  icon: BadgeIcon = Users,
}) {
  const isLightCentered = theme === "light" && layout === "centered";

  if (isLightCentered) {
    return (
      <PageSection className="bg-topo overflow-hidden" contained={false}>
        <DottedArcs />
        <div className="container-page relative z-10 section-pad">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-accent bg-white">
              <BadgeIcon className="h-6 w-6 text-accent" aria-hidden="true" />
            </span>
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">{heading}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">{actions ?? defaultActions}</div>
          </div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection className="bg-topo pb-6 pt-2">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-10 text-white sm:px-10 lg:px-14">
        <WaveDecoration
          variant="cta"
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 md:block"
        />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-white/70">
              <BadgeIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
            <p className="mt-3 text-white/80">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">{actions ?? defaultActions}</div>
        </div>
      </div>
    </PageSection>
  );
}
