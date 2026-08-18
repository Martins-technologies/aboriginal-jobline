import { Link } from "react-router-dom";
import Button from "./Button";
import SectionEyebrow from "./SectionEyebrow";

export default function ComingSoonPage({
  title = "Coming Soon",
  description = "This page is being built and will be available in a future module of Aboriginal Jobline.",
}) {
  return (
    <section className="bg-topo flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="max-w-xl rounded-2xl bg-white p-10 text-center shadow-card">
        <SectionEyebrow>Coming Soon</SectionEyebrow>
        <h1 className="mt-4 text-4xl font-bold text-primary">{title}</h1>
        <p className="mt-4 text-muted">{description}</p>
        <div className="mt-8 flex justify-center">
          <Button to="/browse-jobs" variant="secondary">
            Back to Browse Jobs
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Looking for something else? Visit{" "}
          <Link to="/" className="font-semibold text-accent hover:underline">
            Home
          </Link>{" "}
          or{" "}
          <Link to="/contact" className="font-semibold text-accent hover:underline">
            Contact
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
