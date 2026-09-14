import { useEffect, useState } from "react";
import { getPublicCategories } from "../lib/jobs";

export function useServiceCareCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getPublicCategories()
      .then((data) => {
        if (!active) return;
        setCategories(data);
        setError(null);
      })
      .catch((err) => {
        if (active) {
          setCategories([]);
          setError(err.message || "Categories could not be loaded.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading, error };
}
