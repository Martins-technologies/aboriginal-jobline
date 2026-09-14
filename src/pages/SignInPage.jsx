import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Star } from "lucide-react";
import SignInForm from "../components/auth/SignInForm";
import DashedDivider from "../components/common/DashedDivider";
import DottedArcs from "../components/common/DottedArcs";
import PageSection from "../components/common/PageSection";
import PageWithFooter from "../components/layout/PageWithFooter";
import { defaultFooterConfig } from "../data/footerConfigs";
import { homeTestimonials } from "../data/homeTestimonials";
import { isRecruiterRole } from "../lib/mappers";
import { useAuth } from "../lib/auth/AuthContext";
import Spinner from "../components/common/Spinner";

const testimonialsByRole = {
  "job-seeker": homeTestimonials.find((item) => item.id === "melissa-k") || homeTestimonials[0],
  employer: homeTestimonials.find((item) => item.id === "james-t") || homeTestimonials[1],
};

export default function SignInPage() {
  const { session, loading, profile } = useAuth();
  const [role, setRole] = useState("job-seeker");
  const testimonial = testimonialsByRole[role];

  if (loading) {
    return (
      <PageWithFooter config={defaultFooterConfig}>
        <Spinner label="Checking your session" className="min-h-[50vh]" />
      </PageWithFooter>
    );
  }

  if (session) {
    return (
      <Navigate
        to={isRecruiterRole(profile?.role) ? "/employer-dashboard/overview" : "/dashboard/overview"}
        replace
      />
    );
  }

  return (
    <PageWithFooter config={defaultFooterConfig}>
      <PageSection className="bg-topo overflow-hidden hero-pad" contained={false}>
        <DottedArcs />
        <div className="container-page relative section-pad">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="max-w-xl">
              <DashedDivider className="mb-5 justify-start" />
              <h1 className="font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl">
                Welcome back to{" "}
                <span className="text-accent">Canada&apos;s Indigenous</span> hiring platform.
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                Log in to manage your applications, saved jobs, or job postings — all in one
                place.
              </p>

              <article className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-card">
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-accent-light text-accent-light"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-body">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="mt-4 font-sans text-sm font-semibold text-primary">{testimonial.name}</p>
                <p className="text-xs text-muted">{testimonial.role}</p>
              </article>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-serif text-3xl font-bold text-primary">Welcome back</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {role === "employer"
                  ? "Sign in to post roles, review applicants, and stay connected with Indigenous talent across Canada."
                  : "Sign in to track applications, save jobs, and continue your career journey with inclusive employers."}
              </p>
              <div className="mt-6">
                <SignInForm role={role} onRoleChange={setRole} />
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </PageWithFooter>
  );
}
