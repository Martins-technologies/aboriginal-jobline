import Button from "./Button";
import PageSection from "./PageSection";
import SectionEyebrow from "./SectionEyebrow";
import PageWithFooter from "../layout/PageWithFooter";
import { defaultFooterConfig } from "../../data/footerConfigs";

export default function NotFoundPage() {
  return (
    <PageWithFooter config={defaultFooterConfig}>
      <PageSection className="bg-topo flex min-h-[60vh] items-center py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-card">
          <SectionEyebrow>Page not found</SectionEyebrow>
          <h1 className="mt-4 text-4xl font-bold text-primary">We can’t find that page</h1>
          <p className="mt-4 text-muted">
            The link may be outdated. Use the menu to continue, or go to one of these pages.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" variant="primary">
              Home
            </Button>
            <Button to="/browse-jobs" variant="secondary">
              Browse Jobs
            </Button>
            <Button to="/about-us" variant="outline">
              About Us
            </Button>
          </div>
        </div>
      </PageSection>
    </PageWithFooter>
  );
}
