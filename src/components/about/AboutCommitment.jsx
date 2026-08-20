import { Link } from "react-router-dom";
import PageSection from "../common/PageSection";
import AboutEyebrow from "./AboutEyebrow";
import DashedCircleIcon from "./DashedCircleIcon";
import { aboutCommitments } from "../../data/aboutPage";

export default function AboutCommitment() {
  return (
    <PageSection className="bg-topo py-8 lg:py-10">
      <AboutEyebrow>Our Commitment</AboutEyebrow>
      <h2 className="section-title mt-3">Creating a More Inclusive Workforce</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-0">
        {aboutCommitments.map((item, index) => (
          <Link
            key={item.id}
            to={item.to}
            className={`rounded-xl py-1 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-8 ${
              index === 0 ? "md:pl-0" : "md:border-l md:border-black/10"
            }`}
          >
            <article className="flex items-center gap-4">
              <DashedCircleIcon icon={item.icon} tone="primary" />
              <div className="min-w-0">
                <h3 className="font-sans text-base font-bold text-primary">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-body">{item.description}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
