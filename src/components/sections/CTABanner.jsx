import { Search, UserPlus, Users } from "lucide-react";
import Button from "../common/Button";
import PageSection from "../common/PageSection";
import WaveDecoration from "../common/WaveDecoration";

export default function CTABanner() {
  return (
    <PageSection className="bg-topo pb-8 pt-4">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-10 text-white sm:px-10 lg:px-14">
        <WaveDecoration
          variant="cta"
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 md:block"
        />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-white/70">
              <Users className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Find Your Next Opportunity?
            </h2>
            <p className="mt-3 text-white/80">
              Browse inclusive roles or create a free profile so employers committed to
              Indigenous talent can reach you first.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/browse-jobs" variant="outline-white" icon={Search}>
              Browse Jobs
            </Button>
            <Button to="/create-profile" variant="white" icon={UserPlus}>
              Create Profile
            </Button>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
