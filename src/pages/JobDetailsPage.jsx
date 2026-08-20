import { Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import PageSection from "../components/common/PageSection";
import JobApplyForm from "../components/jobs/JobApplyForm";
import JobCard from "../components/jobs/JobCard";
import PageWithFooter from "../components/layout/PageWithFooter";
import { categories } from "../data/categories";
import { browseJobsFooterConfig } from "../data/footerConfigs";
import { jobs } from "../data/jobs";
import { formatSalary } from "../utils/jobs";

function relatedJobs(job) {
  return jobs
    .filter(
      (item) =>
        item.id !== job.id && (item.category === job.category || item.region === job.region),
    )
    .slice(0, 3);
}

export default function JobDetailsPage() {
  const { id } = useParams();
  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return <Navigate to="/browse-jobs" replace />;
  }

  const category = categories.find((item) => item.slug === job.category);
  const related = relatedJobs(job);

  return (
    <PageWithFooter config={browseJobsFooterConfig}>
      <PageSection className="bg-topo section-pad">
        <Link
          to="/browse-jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Browse Jobs
        </Link>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] lg:gap-10">
          <article className="surface-card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
                  {job.title}
                </h1>
                <p className="mt-2 text-base text-muted">{job.company}</p>
              </div>
              <Badge>{job.badge}</Badge>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-primary" aria-hidden="true" />
                {job.type} · {job.workplace}
              </span>
            </div>

            <p className="mt-4 font-sans text-xl font-bold text-accent">{formatSalary(job)}</p>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="font-serif text-2xl text-primary">About this role</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">{job.description}</p>
              </section>
              <section>
                <h2 className="font-serif text-2xl text-primary">What you’ll do</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted">
                  <li>{job.description}</li>
                  <li>
                    Work with inclusive teams committed to Indigenous talent and community
                    partnership.
                  </li>
                  <li>
                    Contribute to a culturally respectful workplace that values your experience.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="font-serif text-2xl text-primary">What you’ll bring</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted">
                  <li>{job.experience} experience in a related role.</li>
                  {category ? <li>Interest in {category.title.toLowerCase()} work.</li> : null}
                  <li>Ability to work {job.workplace.toLowerCase()}.</li>
                </ul>
              </section>
            </div>
          </article>

          <aside className="surface-card p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-primary">Apply for this job</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Share your details and a short cover note. We’ll keep a copy of your application
              so you can keep browsing other roles.
            </p>
            <div className="mt-6">
              <JobApplyForm job={job} />
            </div>
          </aside>
        </div>

        {related.length ? (
          <div className="mt-12">
            <h2 className="section-title">Similar opportunities</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button to="/browse-jobs" variant="outline">
                View all jobs
              </Button>
            </div>
          </div>
        ) : null}
      </PageSection>
    </PageWithFooter>
  );
}
