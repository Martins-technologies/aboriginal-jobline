import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { saveJob, unsaveJob } from "./jobs";
import { useAuth } from "./auth/AuthContext";

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const { session, isSeeker } = useAuth();
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hydrate = useCallback((ids) => {
    setSavedIds(new Set((ids || []).map((id) => String(id))));
  }, []);

  useEffect(() => {
    if (!session?.accessToken || !isSeeker) {
      setSavedIds(new Set());
      setError("");
      return undefined;
    }
    return undefined;
  }, [isSeeker, session?.accessToken]);

  const isSaved = useCallback((jobId) => savedIds.has(String(jobId)), [savedIds]);

  const toggleSaved = useCallback(
    async (jobId) => {
      if (!session?.accessToken) {
        throw new Error("Sign in as a job seeker to save jobs.");
      }
      const idStr = String(jobId);
      const wasSaved = savedIds.has(idStr);
      setError("");
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (wasSaved) next.delete(idStr);
        else next.add(idStr);
        return next;
      });
      try {
        if (wasSaved) await unsaveJob(idStr);
        else await saveJob(idStr);
      } catch (err) {
        setSavedIds((prev) => {
          const next = new Set(prev);
          if (wasSaved) next.add(idStr);
          else next.delete(idStr);
          return next;
        });
        setError(err.message || "Could not update saved jobs.");
        throw err;
      }
    },
    [savedIds, session?.accessToken],
  );

  return (
    <SavedJobsContext.Provider value={{ savedIds, loading, error, isSaved, toggleSaved, hydrate }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used within a SavedJobsProvider");
  }
  return context;
}

export default SavedJobsContext;
