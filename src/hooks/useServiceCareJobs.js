import { useEffect, useState } from "react";
import { getPublicJobs, getServiceCareCategories, normalizeJob } from "../lib/jobs";

export function useServiceCareJobs(query = {}) {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryString = JSON.stringify(query);

  useEffect(() => {
    let active = true;
    setLoading(true);
    
    Promise.all([getPublicJobs(query), getServiceCareCategories()])
      .then(([rawJobs, rawCategories]) => {
        if (active) {
          const normalized = (rawJobs || []).map((job) => normalizeJob(job, rawCategories));
          setJobs(normalized);
          setCategories(rawCategories);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Failed to load jobs");
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
  }, [queryString]);

  return { jobs, categories, loading, error };
}
