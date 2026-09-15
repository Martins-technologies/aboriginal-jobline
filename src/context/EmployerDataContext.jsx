import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Spinner from "../components/common/Spinner";
import { ApiError } from "../lib/api";
import { useAuth } from "../lib/auth/AuthContext";
import {
  createRecruiterJob,
  getApplicantResumeUrl,
  getJobApplications,
  getRecruiterApplications,
  getRecruiterCompanies,
  getRecruiterDashboard,
  updateApplicationStatus,
  updateRecruiterCompany,
  updateRecruiterJob,
} from "../lib/jobs";
import {
  EMPLOYER_STAGES,
  mapApplicant,
  mapRecruiterJob,
  nextApplicationStatus,
  RECRUITER_STAGE_TO_STATUS,
} from "../lib/mappers";

export { EMPLOYER_STAGES };

const EmployerDataContext = createContext(null);

export function EmployerDataProvider({ children }) {
  const { session, isRecruiter } = useAuth();
  const [jobPostings, setJobPostings] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [metrics, setMetrics] = useState({
    companies: 0,
    jobs: 0,
    activeJobs: 0,
    applications: 0,
    views: 0,
  });
  const [pipeline, setPipeline] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const companyProfile = companies[0] || null;

  const reload = useCallback(async () => {
    if (!session?.accessToken || !isRecruiter) return;
    setLoading(true);
    setError("");
    try {
      const [dashboard, companyItems, applicationPage] = await Promise.all([
        getRecruiterDashboard(),
        getRecruiterCompanies(),
        getRecruiterApplications({ page: 1, pageSize: 100 }),
      ]);
      setCompanies(companyItems);
      setJobPostings((dashboard.jobs || []).map(mapRecruiterJob));
      setApplicants((applicationPage.items || dashboard.recentApplications || []).map(mapApplicant));
      setMetrics({
        companies: dashboard.metrics?.companies ?? companyItems.length,
        jobs: dashboard.metrics?.jobs ?? 0,
        activeJobs: dashboard.metrics?.activeJobs ?? 0,
        applications: dashboard.metrics?.applications ?? 0,
        views: dashboard.metrics?.views ?? 0,
      });
      setPipeline(dashboard.pipeline || {});
    } catch (err) {
      setError(err.message || "Your employer dashboard could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [isRecruiter, session?.accessToken]);

  useEffect(() => {
    reload();
  }, [reload]);

  const createJobPosting = useCallback(
    async (payload) => {
      setActionError("");
      const data = await createRecruiterJob(payload);
      await reload();
      return data.job;
    },
    [reload],
  );

  const updateJobPosting = useCallback(
    async (id, payload) => {
      setActionError("");
      const data = await updateRecruiterJob(id, payload);
      await reload();
      return data.job;
    },
    [reload],
  );

  const closeJobPosting = useCallback(
    async (id) => {
      setActionError("");
      setActionMessage("");
      try {
        await updateRecruiterJob(id, { status: "closed" });
        setActionMessage("This posting is now closed.");
        await reload();
      } catch (err) {
        setActionError(err.message || "This posting could not be closed.");
      }
    },
    [reload],
  );

  const deleteJobPosting = useCallback(async () => {
    setActionError("Recruiters cannot delete postings from this site. Close the posting instead, or ask an admin to remove it.");
  }, []);

  const setApplicantStage = useCallback(
    async (id, stageOrStatus) => {
      setActionError("");
      const status = RECRUITER_STAGE_TO_STATUS[stageOrStatus] || stageOrStatus;
      try {
        await updateApplicationStatus(id, status);
        await reload();
      } catch (err) {
        if (err instanceof ApiError && err.code === "INVALID_APPLICATION_TRANSITION") {
          setActionError("That stage change is not allowed from the candidate’s current status.");
        } else {
          setActionError(err.message || "The candidate status could not be updated.");
        }
        throw err;
      }
    },
    [reload],
  );

  const advanceApplicantStage = useCallback(
    async (id) => {
      const current = applicants.find((item) => item.id === id);
      const next = nextApplicationStatus(current?.apiStatus);
      if (!next) {
        setActionError("This candidate cannot be advanced any further.");
        return;
      }
      await setApplicantStage(id, next);
    },
    [applicants, setApplicantStage],
  );

  const rejectApplicant = useCallback(
    async (id) => {
      await setApplicantStage(id, "rejected");
    },
    [setApplicantStage],
  );

  const updateApplicantNotes = useCallback(() => {
    setActionError("Private recruiter notes are not stored by the API yet.");
  }, []);

  const updateCompanyProfile = useCallback(
    async (form) => {
      const companyId = companies[0]?.id;
      if (!companyId) {
        throw new ApiError({
          status: 404,
          code: "RECRUITER_COMPANY_NOT_BOUND",
          message: "Your recruiter account is not linked to a company yet.",
        });
      }
      setActionError("");
      await updateRecruiterCompany(companyId, {
        name: form.name?.trim(),
        website: form.website?.trim(),
        registration_number: form.registration_number?.trim(),
        description: form.description?.trim() || null,
      });
      await reload();
    },
    [companies, reload],
  );

  const loadJobApplicants = useCallback(async (jobId) => {
    const items = await getJobApplications(jobId);
    return items.map(mapApplicant);
  }, []);

  const openResume = useCallback(async (applicationId) => {
    const data = await getApplicantResumeUrl(applicationId);
    if (data.url) window.open(data.url, "_blank", "noopener,noreferrer");
    await reload();
    return data;
  }, [reload]);

  const stats = useMemo(
    () => ({
      activePostings: metrics.activeJobs,
      totalApplicants: metrics.applications,
      interviewsScheduled: pipeline.interviewing || 0,
      positionsFilled: pipeline.hired || pipeline.offered || 0,
    }),
    [metrics, pipeline],
  );

  const value = {
    jobPostings,
    applicants,
    companies,
    companyProfile,
    stats,
    pipeline,
    loading,
    error,
    actionError,
    actionMessage,
    createJobPosting,
    updateJobPosting,
    closeJobPosting,
    deleteJobPosting,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantNotes,
    setApplicantStage,
    updateCompanyProfile,
    loadJobApplicants,
    openResume,
    reload,
  };

  if (loading) {
    return <Spinner label="Loading employer workspace" className="min-h-[50vh]" />;
  }

  return (
    <EmployerDataContext.Provider value={value}>
      {children}
    </EmployerDataContext.Provider>
  );
}

export function useEmployerData() {
  const ctx = useContext(EmployerDataContext);
  if (!ctx) throw new Error("useEmployerData must be used within EmployerDataProvider");
  return ctx;
}

export default EmployerDataContext;
