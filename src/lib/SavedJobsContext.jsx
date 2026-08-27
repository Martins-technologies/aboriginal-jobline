import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";
import { useAuth } from "./auth/AuthContext";

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const { session } = useAuth();
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Retrieve saved job lists when authentication session is established
  useEffect(() => {
    if (session?.accessToken) {
      let active = true;
      setLoading(true);
      api("/v1/me/saved-jobs", {}, session.accessToken)
        .then((data) => {
          if (active) {
            const ids = new Set((data || []).map((item) => String(item.job_id || item.jobId)));
            setSavedIds(ids);
          }
        })
        .catch((err) => {
          console.error("Failed to load saved jobs", err);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
      return () => {
        active = false;
      };
    } else {
      setSavedIds(new Set());
    }
  }, [session?.accessToken]);

  const isSaved = (jobId) => savedIds.has(String(jobId));

  const toggleSaved = async (jobId) => {
    if (!session?.accessToken) {
      throw new Error("You must be logged in to save jobs");
    }

    const idStr = String(jobId);
    const wasSaved = savedIds.has(idStr);

    // Optimistic Update
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (wasSaved) {
        next.delete(idStr);
      } else {
        next.add(idStr);
      }
      return next;
    });

    try {
      if (wasSaved) {
        await api(`/v1/me/saved-jobs/${idStr}`, { method: "DELETE" }, session.accessToken);
      } else {
        await api(`/v1/me/saved-jobs/${idStr}`, {
          method: "POST",
          body: JSON.stringify({}),
        }, session.accessToken);
      }
    } catch (err) {
      console.error("Failed to toggle saved job, rolling back", err);
      // Revert the state to previous value on failure
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (wasSaved) {
          next.add(idStr);
        } else {
          next.delete(idStr);
        }
        return next;
      });
      throw err;
    }
  };

  return (
    <SavedJobsContext.Provider value={{ savedIds, loading, isSaved, toggleSaved }}>
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
