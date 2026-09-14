import { Navigate } from "react-router-dom";
import SignUpForm from "../components/auth/SignUpForm";
import DashedDivider from "../components/common/DashedDivider";
import DottedArcs from "../components/common/DottedArcs";
import PageSection from "../components/common/PageSection";
import Spinner from "../components/common/Spinner";
import PageWithFooter from "../components/layout/PageWithFooter";
import { defaultFooterConfig } from "../data/footerConfigs";
import { isRecruiterRole } from "../lib/mappers";
import { useAuth } from "../lib/auth/AuthContext";

export default function SignUpPage({ role = "job_seeker" }) {
  const { session, loading, profile } = useAuth();
  const isEmployer = role === "recruiter";

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
          <div className="mx-auto max-w-xl">
            <DashedDivider className="mb-5 justify-start" />
            <h1 className="font-serif text-4xl font-bold leading-[1.12] text-primary sm:text-5xl">
              {isEmployer ? (
                <>
                  Hire Indigenous talent on{" "}
                  <span className="text-accent">Aboriginal Jobline</span>.
                </>
              ) : (
                <>
                  Create your{" "}
                  <span className="text-accent">job seeker</span> profile.
                </>
              )}
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              {isEmployer
                ? "Register your organization to post roles and review applicants."
                : "Save jobs, apply with your resume, and track applications in one place."}
            </p>
            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-card sm:p-8">
              <SignUpForm role={role} />
            </div>
          </div>
        </div>
      </PageSection>
    </PageWithFooter>
  );
}
