const REGION_KEYWORDS = {
  ontario: ["on", "ontario", "toronto", "ottawa"],
  "british-columbia": ["bc", "british columbia", "vancouver"],
  alberta: ["ab", "alberta", "calgary", "edmonton", "banff"],
  manitoba: ["mb", "manitoba", "winnipeg", "thompson"],
  saskatchewan: ["sk", "saskatchewan", "regina"],
  "atlantic-canada": ["ns", "nb", "pe", "nl", "atlantic", "halifax"],
  remote: ["remote"],
};

function annualSalary(job) {
  if (job.salaryPeriod === "hour") {
    return job.salaryMin * 40 * 52;
  }
  return job.salaryMin;
}

function matchesLocation(job, location) {
  if (!location) return true;
  const value = location.toLowerCase().trim();
  const blob = `${job.location} ${job.province} ${job.region} ${job.workplace}`.toLowerCase();

  if (REGION_KEYWORDS[value]) {
    return REGION_KEYWORDS[value].some((keyword) => blob.includes(keyword)) || job.region === value;
  }

  return blob.includes(value);
}

function matchesSalary(job, salary) {
  if (!salary) return true;
  if (salary === "hourly") return job.salaryPeriod === "hour";
  const annual = annualSalary(job);
  if (salary === "under-40k") return annual < 40000;
  if (salary === "40-60k") return annual >= 40000 && annual <= 60000;
  if (salary === "60k-plus") return annual >= 60000;
  return true;
}

export function filterJobs(jobs, filters) {
  const keyword = (filters.keyword || "").trim().toLowerCase();

  return jobs.filter((job) => {
    if (keyword) {
      const haystack = `${job.title} ${job.company} ${job.description} ${job.location} ${job.category}`.toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }

    if (filters.category && job.category !== filters.category) return false;
    if (filters.type && job.type !== filters.type) return false;
    if (filters.experience && job.experience !== filters.experience) return false;
    if (filters.workplace && job.workplace !== filters.workplace) return false;
    if (!matchesLocation(job, filters.location)) return false;
    if (!matchesSalary(job, filters.salary)) return false;

    return true;
  });
}

export function sortJobs(jobs, sort) {
  const copy = [...jobs];
  if (sort === "newest") {
    return copy.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }
  if (sort === "salary-high") {
    return copy.sort((a, b) => annualSalary(b) - annualSalary(a));
  }
  if (sort === "salary-low") {
    return copy.sort((a, b) => annualSalary(a) - annualSalary(b));
  }
  if (sort === "title") {
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  }
  return copy;
}

export const emptyFilters = {
  keyword: "",
  location: "",
  category: "",
  type: "",
  salary: "",
  experience: "",
  workplace: "",
};

export const FILTER_PARAM_KEYS = {
  keyword: "q",
  location: "location",
  category: "category",
  type: "type",
  salary: "salary",
  experience: "experience",
  workplace: "workplace",
};

export function filtersFromSearchParams(searchParams) {
  return {
    keyword: searchParams.get("q") || "",
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    type: searchParams.get("type") || "",
    salary: searchParams.get("salary") || "",
    experience: searchParams.get("experience") || "",
    workplace: searchParams.get("workplace") || "",
  };
}

export function searchParamsFromFilters(filters) {
  const params = new URLSearchParams();
  Object.entries(FILTER_PARAM_KEYS).forEach(([field, param]) => {
    if (filters[field]) params.set(param, filters[field]);
  });
  return params;
}

export function formatSalary(job) {
  const formatNumber = (value) => {
    if (job.salaryPeriod === "hour") {
      return `$${Number(value).toFixed(2)}`;
    }
    return `$${Number(value).toLocaleString("en-US")}`;
  };

  const period = job.salaryPeriod === "hour" ? "hour" : "year";
  const suffix = job.hasBenefits ? " + Benefits" : "";
  return `${formatNumber(job.salaryMin)} – ${formatNumber(job.salaryMax)} / ${period}${suffix}`;
}

export function buildJobsPath(query = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const qs = params.toString();
  return qs ? `/browse-jobs?${qs}` : "/browse-jobs";
}
