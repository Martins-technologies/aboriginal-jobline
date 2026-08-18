import { useEffect, useState } from "react";
import { Briefcase, Building2, ChevronDown, DollarSign, LayoutGrid, MapPin, RotateCcw, User } from "lucide-react";
import Button from "../common/Button";
import { categories } from "../../data/categories";
import { regions } from "../../data/regions";
import { experienceLevels, jobTypes, salaryRanges, workplaceTypes } from "../../data/jobs";

export default function FilterSidebar({ filters, onApply, onReset }) {
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const update = (field) => (event) => {
    setDraft((current) => ({ ...current, [field]: event.target.value }));
  };

  return (
    <aside className="h-fit rounded-2xl bg-white p-6 shadow-card">
      <h3 className="font-serif text-2xl text-primary">Filter Jobs</h3>
      <form
        className="mt-5 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onApply(draft);
        }}
      >
        <FilterSelect
          id="filter-category"
          icon={LayoutGrid}
          label="Category"
          value={draft.category}
          onChange={update("category")}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.title}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          id="filter-location"
          icon={MapPin}
          label="Location"
          value={draft.location}
          onChange={update("location")}
        >
          <option value="">All Locations</option>
          {regions.map((region) => (
            <option key={region.slug} value={region.slug}>
              {region.name}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          id="filter-type"
          icon={Briefcase}
          label="Job Type"
          value={draft.type}
          onChange={update("type")}
        >
          <option value="">All Job Types</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          id="filter-salary"
          icon={DollarSign}
          label="Salary Range"
          value={draft.salary}
          onChange={update("salary")}
        >
          {salaryRanges.map((range) => (
            <option key={range.value || "any"} value={range.value}>
              {range.label}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          id="filter-experience"
          icon={User}
          label="Experience Level"
          value={draft.experience}
          onChange={update("experience")}
        >
          {experienceLevels.map((level) => (
            <option key={level.value || "any"} value={level.value}>
              {level.label}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          id="filter-workplace"
          icon={Building2}
          label="Workplace Type"
          value={draft.workplace}
          onChange={update("workplace")}
        >
          {workplaceTypes.map((item) => (
            <option key={item.value || "any"} value={item.value}>
              {item.label}
            </option>
          ))}
        </FilterSelect>

        <div className="flex flex-col gap-3 pt-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </button>
          <Button type="submit" variant="secondary" className="w-full">
            Apply Filters
          </Button>
        </div>
      </form>
    </aside>
  );
}

function FilterSelect({ id, icon: Icon, label, value, onChange, children }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative flex items-center gap-3 rounded-xl border border-black/10 bg-background/60 px-3 py-3">
        <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-transparent pr-6 text-sm text-body focus:outline-none"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted" />
      </div>
    </div>
  );
}
