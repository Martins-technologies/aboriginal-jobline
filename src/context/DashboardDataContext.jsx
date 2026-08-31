import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { mockApplications } from "../data/mockApplications";
import { jobs as allJobs } from "../data/jobs";
import { recommendedJobIds } from "../data/mockRecommendedJobs";

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------
const DashboardDataContext = createContext(null);

// ---------------------------------------------------------------------------
// Mock seed: a few saved jobs to start with (non-empty dashboard feel)
// ---------------------------------------------------------------------------
const INITIAL_SAVED_JOB_IDS = new Set([
  "indigenous-employment-coordinator",
  "hospitality-supervisor",
]);

// ---------------------------------------------------------------------------
// Mock profile seed (partially filled — drives completeness bar)
// ---------------------------------------------------------------------------
const INITIAL_PROFILE = {
  fullName: "Alex Redcloud",
  email: "alex.redcloud@email.com",
  phone: "",
  location: "Winnipeg, MB",
  skills: ["Community Outreach", "Microsoft Office"],
  experience: [
    {
      id: "exp-001",
      jobTitle: "Community Outreach Worker",
      company: "First Nations Wellness Centre",
      dates: "2023 – 2025",
      description: "Supported elders and youth with wrap-around wellness services.",
    },
  ],
  education: [],
};

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function DashboardDataProvider({ children }) {
  const [applications, setApplications] = useState(mockApplications);
  const [savedJobIds, setSavedJobIds] = useState(INITIAL_SAVED_JOB_IDS);
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  // -- Derived: full saved job objects
  const savedJobs = useMemo(
    () => allJobs.filter((j) => savedJobIds.has(j.id)),
    [savedJobIds],
  );

  // -- Derived: recommended jobs (filter out already-applied)
  const appliedIds = useMemo(() => new Set(applications.map((a) => a.jobId)), [applications]);

  const recommendedJobs = useMemo(
    () =>
      allJobs.filter((j) => recommendedJobIds.includes(j.id)),
    [],
  );

  // -- Actions ----------------------------------------------------------------

  /** Apply to a job. Idempotent — won't duplicate. */
  const applyToJob = useCallback((job) => {
    setApplications((prev) => {
      if (prev.some((a) => a.jobId === job.id)) return prev;
      return [
        ...prev,
        {
          id: `app-${Date.now()}`,
          jobId: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          icon: job.icon,
          status: "Applied",
          dateApplied: new Date().toISOString().slice(0, 10),
        },
      ];
    });
  }, []);

  /** Withdraw (remove) an application by its application id. */
  const withdrawApplication = useCallback((applicationId) => {
    setApplications((prev) => prev.filter((a) => a.id !== applicationId));
  }, []);

  /** Toggle saved state for a job. */
  const toggleSaveJob = useCallback((job) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(job.id)) {
        next.delete(job.id);
      } else {
        next.add(job.id);
      }
      return next;
    });
  }, []);

  /** Check if a job is applied to. */
  const isApplied = useCallback(
    (jobId) => appliedIds.has(jobId),
    [appliedIds],
  );

  /** Check if a job is saved. */
  const isSaved = useCallback(
    (jobId) => savedJobIds.has(jobId),
    [savedJobIds],
  );

  /** Persist profile changes (structured for easy API swap later). */
  const updateProfile = useCallback((data) => {
    setProfile((prev) => ({ ...prev, ...data }));
  }, []);

  // -- Stats ------------------------------------------------------------------
  const stats = useMemo(
    () => ({
      applications: applications.length,
      savedJobs: savedJobIds.size,
      interviews: applications.filter((a) => a.status === "Interview").length,
      offers: applications.filter((a) => a.status === "Offer").length,
    }),
    [applications, savedJobIds],
  );

  const value = {
    // State
    applications,
    savedJobs,
    savedJobIds,
    recommendedJobs,
    profile,
    stats,
    // Derived helpers
    isApplied,
    isSaved,
    // Actions
    applyToJob,
    withdrawApplication,
    toggleSaveJob,
    updateProfile,
  };

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useDashboard() {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardDataProvider");
  return ctx;
}

export default DashboardDataContext;
