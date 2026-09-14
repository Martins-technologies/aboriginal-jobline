import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth/AuthContext";
import { useSavedJobs } from "../lib/SavedJobsContext";
import {
  getRecommendedJobs,
  getSeekerDashboard,
  updateProfile as patchProfile,
} from "../lib/jobs";
import { ApiError } from "../lib/api";
import { mapPublicJob, mapSavedJob, mapSeekerApplication, mapSeekerProfile, profilePatchFromForm } from "../lib/mappers";
import Spinner from "../components/common/Spinner";

const DashboardDataContext = createContext(null);

export function DashboardDataProvider({ children }) {
  const navigate = useNavigate();
  const { session, profile: authProfile, user, isSeeker } = useAuth();
  const { hydrate, isSaved, toggleSaved, savedIds } = useSavedJobs();

  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [profile, setProfile] = useState(() => mapSeekerProfile(authProfile, user));
  const [metrics, setMetrics] = useState({
    applications: 0,
    savedJobs: 0,
    interviews: 0,
    shortlisted: 0,
    offers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const reload = useCallback(async () => {
    if (!session?.accessToken || !isSeeker) return;
    setLoading(true);
    setError("");
    try {
      const [dashboard, recommended] = await Promise.all([
        getSeekerDashboard(),
        getRecommendedJobs(8).catch(() => ({ items: [] })),
      ]);
      const apps = (dashboard.applications || []).map(mapSeekerApplication);
      const saved = (dashboard.savedJobs || []).map(mapSavedJob).filter(Boolean);
      setApplications(apps);
      setSavedJobs(saved);
      hydrate(dashboard.savedJobIds || saved.map((job) => job.id));
      setProfile(mapSeekerProfile(dashboard.profile || authProfile, user));
      setMetrics({
        applications: dashboard.metrics?.applications ?? apps.length,
        savedJobs: dashboard.metrics?.savedJobs ?? saved.length,
        interviews: dashboard.metrics?.interviews ?? 0,
        shortlisted: dashboard.metrics?.shortlisted ?? 0,
        offers: dashboard.metrics?.offers ?? 0,
      });
      setRecommendedJobs((recommended.items || []).map((job) => mapPublicJob(job)));
    } catch (err) {
      setError(err.message || "Your dashboard could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [authProfile, hydrate, isSeeker, session?.accessToken, user]);

  useEffect(() => {
    reload();
  }, [reload]);

  const applyToJob = useCallback(
    (job) => {
      if (!job?.id) return;
      navigate(`/jobs/${job.id}`);
    },
    [navigate],
  );

  const withdrawApplication = useCallback(() => {
    setActionError("Withdrawing an application is not available yet. Ask a recruiter to update the status.");
  }, []);

  const toggleSaveJob = useCallback(
    async (job) => {
      setActionError("");
      try {
        await toggleSaved(job.id);
        await reload();
      } catch (err) {
        setActionError(err.message || "Could not update saved jobs.");
      }
    },
    [reload, toggleSaved],
  );

  const updateProfile = useCallback(
    async (form) => {
      const payload = profilePatchFromForm(form);
      if (!payload.full_name || payload.full_name.length < 2) {
        throw new ApiError({
          status: 400,
          code: "VALIDATION_ERROR",
          message: "Enter your full name (at least 2 characters).",
        });
      }
      const data = await patchProfile(payload);
      const next = mapSeekerProfile(data.profile, user);
      setProfile(next);
      return next;
    },
    [user],
  );

  const stats = useMemo(
    () => ({
      applications: metrics.applications,
      savedJobs: metrics.savedJobs || savedIds.size,
      interviews: metrics.interviews,
      offers: metrics.offers,
    }),
    [metrics, savedIds.size],
  );

  const isApplied = useCallback(
    (jobId) => applications.some((item) => String(item.jobId) === String(jobId)),
    [applications],
  );

  const value = {
    applications,
    savedJobs,
    savedJobIds: savedIds,
    recommendedJobs,
    profile,
    stats,
    loading,
    error,
    actionError,
    isApplied,
    isSaved,
    applyToJob,
    withdrawApplication,
    toggleSaveJob,
    updateProfile,
    reload,
  };

  if (loading) {
    return <Spinner label="Loading your dashboard" className="min-h-[50vh]" />;
  }

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardDataProvider");
  return ctx;
}

export default DashboardDataContext;
