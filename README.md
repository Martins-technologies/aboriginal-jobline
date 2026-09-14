# Newcomer Jobline — Aboriginal & Indigenous Jobs Platform

A frontend React application for Canada's Indigenous hiring platform.

## Modules & Progress

### Employer / Recruiter Dashboard (New Module)
- **Authenticated Route Group**: Fully gated `/employer-dashboard/*` workspace replacing the placeholder redirect stub.
  - `/employer-dashboard/overview` — Overview Page (banner, stat cards, recent applicants, active job postings)
  - `/employer-dashboard/job-postings` — Job Postings Page (filter by status/search, edit, close, delete)
  - `/employer-dashboard/post-a-job` — Post Job Page (reuses Module 2's `JobPostingForm` for both creation and editing)
  - `/employer-dashboard/job-postings/:jobId/applicants` — Job Applicants Page (per-posting candidate list)
  - `/employer-dashboard/applicants` — All Applicants Page (filterable by job posting, pipeline stage, and candidate name)
  - `/employer-dashboard/company-profile` — Company Profile Page (company info & logo upload)
  - `/employer-dashboard/settings` — Employer Settings Page (account, notification preferences, team members, danger zone)
- **Shared Dashboard Shell**: Parameterized `DashboardLayout` and `DashboardSidebar` shared between Job Seeker and Employer dashboards for complete visual and structural consistency.
- **State Management**: `EmployerDataContext` manages state for job postings, candidate applications, pipeline stage transitions, recruiter notes, and company profile. Structured for seamless future API integration.
- **Pipeline Stage Mapping (Seeker ↔ Employer)**:
  - `Applied` ↔ `New`
  - `In Review` ↔ `Reviewed`
  - `Interview` ↔ `Interview`
  - `Offer` ↔ `Offer`
  - `Not Selected` ↔ `Rejected`
  *(Plus employer-specific `Shortlisted` stage)*

### Job Seeker Dashboard
- Private workspace for job seekers under `/dashboard/*` (Overview, Find Jobs, My Applications, Saved Jobs, My Profile, Settings).

### Marketing & Public Site (Modules 1–6)
- Public landing pages, Job Search, Job Details, Post a Job, Sign In flow for both roles.
