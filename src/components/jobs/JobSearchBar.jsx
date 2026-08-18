import { useEffect, useState } from "react";
import { Briefcase, ChevronDown, LayoutGrid, MapPin, Search } from "lucide-react";
import Button from "../common/Button";
import { categories } from "../../data/categories";
import { jobTypes } from "../../data/jobs";

export default function JobSearchBar({ filters, onSearch }) {
  const [form, setForm] = useState({
    keyword: filters.keyword || "",
    location: filters.location || "",
    category: filters.category || "",
    type: filters.type || "",
  });

  useEffect(() => {
    setForm({
      keyword: filters.keyword || "",
      location: filters.location || "",
      category: filters.category || "",
      type: filters.type || "",
    });
  }, [filters.keyword, filters.location, filters.category, filters.type]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-3xl bg-white p-4 shadow-search sm:p-5 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]"
    >
      <Field
        icon={Search}
        label="Job title or keyword"
        htmlFor="search-keyword"
      >
        <input
          id="search-keyword"
          type="text"
          value={form.keyword}
          onChange={update("keyword")}
          placeholder="e.g. Teacher, Administrator, Nurse"
          className="w-full bg-transparent text-sm text-body placeholder:text-muted/80 focus:outline-none"
        />
      </Field>

      <Field icon={MapPin} label="Location" htmlFor="search-location">
        <input
          id="search-location"
          type="text"
          value={form.location}
          onChange={update("location")}
          placeholder="e.g. Toronto, ON or Remote"
          className="w-full bg-transparent text-sm text-body placeholder:text-muted/80 focus:outline-none"
        />
      </Field>

      <Field icon={LayoutGrid} label="Category" htmlFor="search-category">
        <div className="relative">
          <select
            id="search-category"
            value={form.category}
            onChange={update("category")}
            className="w-full appearance-none bg-transparent pr-6 text-sm text-body focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </Field>

      <Field icon={Briefcase} label="Job type" htmlFor="search-type">
        <div className="relative">
          <select
            id="search-type"
            value={form.type}
            onChange={update("type")}
            className="w-full appearance-none bg-transparent pr-6 text-sm text-body focus:outline-none"
          >
            <option value="">All Job Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </Field>

      <div className="flex items-end">
        <Button type="submit" variant="secondary" icon={Search} className="h-[52px] w-full px-6 lg:w-auto">
          Search Jobs
        </Button>
      </div>
    </form>
  );
}

function Field({ icon: Icon, label, htmlFor, children }) {
  return (
    <div className="flex items-start gap-3 border-b border-black/10 pb-3 lg:border-b-0 lg:border-r lg:pr-4 lg:pb-0 last:border-0">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-accent-light" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <label htmlFor={htmlFor} className="mb-1 block text-xs font-semibold text-primary">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}
