import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { mockJobPostings } from "../data/mockJobPostings";
import { mockApplicants } from "../data/mockApplicants";

// ---------------------------------------------------------------------------
// Employer pipeline stages — employer-facing labels
// Seeker↔Employer mapping:
//   Applied → New | In Review → Reviewed | Interview → Interview
//   Offer → Offer | Not Selected → Rejected
// ---------------------------------------------------------------------------
export const EMPLOYER_STAGES = ["New", "Reviewed", "Shortlisted", "Interview", "Offer", "Rejected"];

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------
const EmployerDataContext = createContext(null);

// ---------------------------------------------------------------------------
// Mock seed: initial company profile
// ---------------------------------------------------------------------------
const INITIAL_COMPANY_PROFILE = {
  name: "Northern Health Services",
  logoFilename: "",
  industry: "Healthcare",
  size: "51-200",
  website: "https://northernhealth.ca",
  location: "Winnipeg, MB",
  description:
    "Northern Health Services is a leading Indigenous-owned health organization providing culturally safe care and community wellness programs across Manitoba.",
};

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function EmployerDataProvider({ children }) {
  const [jobPostings, setJobPostings] = useState(mockJobPostings);
  const [applicants, setApplicants] = useState(mockApplicants);
  const [companyProfile, setCompanyProfile] = useState(INITIAL_COMPANY_PROFILE);

  // ---------------------------------------------------------------------------
  // Job Posting Actions
  // Each action is structured so swapping to an API call later is a localized change.
  // ---------------------------------------------------------------------------

  /** Create a new job posting with a generated id and timestamp. */
  const createJobPosting = useCallback((data) => {
    const newPosting = {
      id: `emp-job-${Date.now()}`,
      postedDate: new Date().toISOString().slice(0, 10),
      applicantCount: 0,
      ...data,
    };
    setJobPostings((prev) => [newPosting, ...prev]);
    return newPosting;
  }, []);

  /** Update an existing posting by id. */
  const updateJobPosting = useCallback((id, data) => {
    setJobPostings((prev) =>
      prev.map((posting) => (posting.id === id ? { ...posting, ...data } : posting))
    );
  }, []);

  /** Mark a posting as Closed — it stops accepting new applicants. */
  const closeJobPosting = useCallback((id) => {
    setJobPostings((prev) =>
      prev.map((posting) =>
        posting.id === id ? { ...posting, status: "Closed" } : posting
      )
    );
  }, []);

  /** Permanently remove a posting. */
  const deleteJobPosting = useCallback((id) => {
    setJobPostings((prev) => prev.filter((posting) => posting.id !== id));
  }, []);

  // ---------------------------------------------------------------------------
  // Applicant Actions
  // ---------------------------------------------------------------------------

  /** Advance an applicant to the next pipeline stage. Noop at "Offer". */
  const advanceApplicantStage = useCallback((id) => {
    setApplicants((prev) =>
      prev.map((applicant) => {
        if (applicant.id !== id) return applicant;
        const currentIndex = EMPLOYER_STAGES.indexOf(applicant.stage);
        // Don't advance past Offer; can't advance someone who is Rejected
        if (
          applicant.stage === "Rejected" ||
          currentIndex >= EMPLOYER_STAGES.indexOf("Offer")
        ) {
          return applicant;
        }
        return { ...applicant, stage: EMPLOYER_STAGES[currentIndex + 1] };
      })
    );
  }, []);

  /** Mark an applicant as Rejected. */
  const rejectApplicant = useCallback((id) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, stage: "Rejected" } : applicant
      )
    );
  }, []);

  /** Update recruiter's private notes for an applicant. */
  const updateApplicantNotes = useCallback((id, notes) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, recruiterNotes: notes } : applicant
      )
    );
  }, []);

  /** Set an applicant to a specific pipeline stage directly. */
  const setApplicantStage = useCallback((id, stage) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, stage } : applicant
      )
    );
  }, []);

  // ---------------------------------------------------------------------------
  // Company Profile Actions
  // ---------------------------------------------------------------------------

  /** Persist company profile changes (structured for easy API swap later). */
  const updateCompanyProfile = useCallback((data) => {
    setCompanyProfile((prev) => ({ ...prev, ...data }));
  }, []);

  // ---------------------------------------------------------------------------
  // Derived stats
  // ---------------------------------------------------------------------------
  const stats = useMemo(
    () => ({
      activePostings: jobPostings.filter((p) => p.status === "Active").length,
      totalApplicants: applicants.length,
      interviewsScheduled: applicants.filter((a) => a.stage === "Interview").length,
      positionsFilled: applicants.filter((a) => a.stage === "Offer").length,
    }),
    [jobPostings, applicants]
  );

  // ---------------------------------------------------------------------------
  // Derived: applicant count per posting (kept in sync)
  // ---------------------------------------------------------------------------
  const enrichedPostings = useMemo(
    () =>
      jobPostings.map((posting) => ({
        ...posting,
        applicantCount: applicants.filter((a) => a.jobId === posting.id).length,
      })),
    [jobPostings, applicants]
  );

  const value = {
    // State
    jobPostings: enrichedPostings,
    applicants,
    companyProfile,
    stats,
    // Job Posting actions
    createJobPosting,
    updateJobPosting,
    closeJobPosting,
    deleteJobPosting,
    // Applicant actions
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantNotes,
    setApplicantStage,
    // Company profile actions
    updateCompanyProfile,
  };

  return (
    <EmployerDataContext.Provider value={value}>
      {children}
    </EmployerDataContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useEmployerData() {
  const ctx = useContext(EmployerDataContext);
  if (!ctx) throw new Error("useEmployerData must be used within EmployerDataProvider");
  return ctx;
}

export default EmployerDataContext;
