import { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import PageSection from "../components/common/PageSection";
import JobApplyForm from "../components/jobs/JobApplyForm";
import JobCard from "../components/jobs/JobCard";
import PageWithFooter from "../components/layout/PageWithFooter";
import { browseJobsFooterConfig } from "../data/footerConfigs";
import { getPublicJob, getServiceCareCategories, getPublicJobs, recordJobView, normalizeJob } from "../lib/jobs";
import { formatSalary } from "../utils/jobs";

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    Promise.all([getPublicJob(id), getServiceCareCategories()])
      .then(([rawJob, rawCategories]) => {
        if (active) {
          const normalized = normalizeJob(rawJob, rawCategories);
          setJob(normalized);
          setCategoriesList(rawCategories);
          
          recordJobView(id).catch((err) => console.error("Error recording view", err));

          getPublicJobs({ limit: 100 })
            .then((allJobs) => {
              if (active) {
                const normalizedRelated = (allJobs || [])
                  .map((j) => normalizeJob(j, rawCategories))
                  .filter(
                    (j) =>
                      j &&
                      j.id !== normalized.id &&
                      (j.category === normalized.category || j.region === normalized.region)
                  )
                  .slice(0, 3);
                setRelated(normalizedRelated);
              }
            })
            .catch((err) => console.error("Error fetching related jobs", err));
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Failed to load job details");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <PageWithFooter config={browseJobsFooterConfig}>
        <PageSection className="bg-topo section-pad text-center py-20">
          <h1 className="font-serif text-3xl font-bold text-primary">Loading job...</h1>
        </PageSection>
      </PageWithFooter>
    );
  }

  if (error || !job) {
    return (
      <PageWithFooter config={browseJobsFooterConfig}>
        <PageSection className="bg-topo section-pad text-center py-20">
          <h1 className="font-serif text-3xl font-bold text-accent">Job not found</h1>
          <p className="mt-4 text-muted">{error || "The requested job listing could not be found."}</p>
          <div className="mt-6">
            <Link to="/browse-jobs" className="text-primary font-semibold hover:underline">
              Back to Browse Jobs
            </Link>
          </div>
        </PageSection>
      </PageWithFooter>
    );
  }

  const category = categoriesList.find((item) => item.slug === job.category);

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
