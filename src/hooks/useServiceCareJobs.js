import { useEffect, useState } from "react";
import { getPublicJobs, getPublicCategories } from "../lib/jobs";

export function useServiceCareJobs(query = {}) {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryString = JSON.stringify(query);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const parsed = JSON.parse(queryString);

    Promise.all([getPublicJobs(parsed), getPublicCategories()])
      .then(([jobResult, categoryItems]) => {
        if (!active) return;
        setJobs(jobResult.items || []);
        setPagination(jobResult.pagination);
        setCategories(categoryItems);
        setError(null);
      })
      .catch((err) => {
        if (active) {
          setJobs([]);
          setError(err.message || "Jobs could not be loaded.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [queryString]);

  return { jobs, categories, pagination, loading, error };
}
