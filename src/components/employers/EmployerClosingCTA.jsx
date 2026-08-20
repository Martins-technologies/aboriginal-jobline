import { Briefcase, Phone, Users } from "lucide-react";
import Button from "../common/Button";
import PageSection from "../common/PageSection";
import WaveGraphic from "../common/WaveGraphic";
import { images } from "../../data/images";

export default function EmployerClosingCTA() {
  return (
    <PageSection className="bg-topo section-pad">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-7 text-white sm:px-10 lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-accent-light/80 text-accent-light">
              <Users className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="max-w-xl font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
              Build a Stronger Workforce with{" "}
              <span className="text-accent">Aboriginal Jobline</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
              Post jobs, connect with qualified Aboriginal and Indigenous talent, and build a
              workplace that reflects the communities you serve.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button to="/post-a-job" variant="secondary" icon={Briefcase}>
                Post a Job
              </Button>
              <Button to="/contact" variant="outline-white" icon={Phone}>
                Contact Us
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative z-10 overflow-hidden rounded-[28px] shadow-card">
              <img
                src={images.employerClosing.src}
                alt={images.employerClosing.alt}
                className="aspect-[5/4] h-full w-full object-cover object-[center_30%]"
              />
            </div>
            <WaveGraphic className="pointer-events-none absolute -right-6 -bottom-8 z-20 w-[70%] max-w-sm" />
          </div>
        </div>
      </div>
    </PageSection>
  );
}
