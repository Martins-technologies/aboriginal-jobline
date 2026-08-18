import { Briefcase, Mail } from "lucide-react";
import AccentHeading from "../common/AccentHeading";
import Button from "../common/Button";
import ContactIllustration from "../common/ContactIllustration";
import DottedArcs from "../common/DottedArcs";
import PageSection from "../common/PageSection";
import SectionWaveDivider from "../common/SectionWaveDivider";

export default function ContactClosingCTA() {
  return (
    <PageSection className="bg-topo" contained={false}>
      <DottedArcs />
      <div className="container-page relative section-pad">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <div>
            <AccentHeading className="max-w-xl text-3xl sm:text-4xl lg:text-[2.5rem]">
              We’re Ready to Hear From You
            </AccentHeading>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Whether you’re a job seeker looking for your next opportunity, an employer seeking
              Indigenous talent, or a community partner wanting to collaborate, Aboriginal Jobline
              is here to connect and support you. Let’s build a stronger, more inclusive future
              for Indigenous employment across Canada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#contact-form" variant="secondary" icon={Mail}>
                Send a Message
              </Button>
              <Button to="/browse-jobs" variant="outline" icon={Briefcase}>
                Browse Jobs
              </Button>
            </div>
          </div>
          <ContactIllustration />
        </div>
      </div>
      <SectionWaveDivider />
    </PageSection>
  );
}
