import { Link } from "react-router-dom";
import Button from "./Button";
import PageSection from "./PageSection";
import SectionEyebrow from "./SectionEyebrow";
import PageWithFooter from "../layout/PageWithFooter";
import { defaultFooterConfig } from "../../data/footerConfigs";

export default function ComingSoonPage({
  title = "Coming Soon",
  description = "This page is being built and will be available in a future module of Aboriginal Jobline.",
}) {
  return (
    <PageWithFooter config={defaultFooterConfig}>
      <PageSection className="bg-topo flex min-h-[60vh] items-center py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-card">
          <SectionEyebrow>Coming Soon</SectionEyebrow>
          <h1 className="mt-4 text-4xl font-bold text-primary">{title}</h1>
          <p className="mt-4 text-muted">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" variant="outline">
              Home
            </Button>
            <Button to="/browse-jobs" variant="secondary">
              Browse Jobs
            </Button>
            <Button to="/post-a-job" variant="outline">
              Post a Job
            </Button>
            <Button to="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Need help now? Visit{" "}
            <Link to="/about-us" className="font-semibold text-accent hover:underline">
              About Us
            </Link>{" "}
            or{" "}
            <Link to="/sign-in" className="font-semibold text-accent hover:underline">
              Sign In
            </Link>
            .
          </p>
        </div>
      </PageSection>
    </PageWithFooter>
  );
}
