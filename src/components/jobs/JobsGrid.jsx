import JobCard from "./JobCard";

export default function JobsGrid({ jobs, view }) {
  if (!jobs.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h3 className="font-serif text-2xl text-primary">No jobs match these filters</h3>
        <p className="mt-2 text-sm text-muted">
          Try clearing a filter or choosing a different category, region, or job type.
        </p>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} layout="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
