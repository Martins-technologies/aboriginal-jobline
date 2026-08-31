/**
 * mockJobPostings.js
 * Seed data for the Employer Dashboard — 3 postings in different statuses.
 * Shape mirrors the existing jobs.js data model so a real API response
 * can replace this with minimal changes.
 *
 * Pipeline stage label mapping (seeker-facing → employer-facing):
 *   Applied      ↔ New
 *   In Review    ↔ Reviewed
 *   Interview    ↔ Interview
 *   Offer        ↔ Offer
 *   Not Selected ↔ Rejected
 */
export const mockJobPostings = [
  {
    id: "emp-job-001",
    title: "Community Engagement Coordinator",
    company: "Northern Health Services",
    location: "Winnipeg, MB",
    employmentType: "Full-time",
    category: "community-services",
    salaryRange: "$52,000 – $65,000",
    description:
      "Lead outreach programs connecting Indigenous communities with health and wellness resources across Manitoba. You will coordinate with Elders, community leaders, and government partners to design and deliver culturally safe programming.",
    status: "Active",
    postedDate: "2026-08-20",
    applicantCount: 4,
  },
  {
    id: "emp-job-002",
    title: "Indigenous Cultural Liaison",
    company: "Northern Health Services",
    location: "Remote, Canada",
    employmentType: "Part-time",
    category: "education",
    salaryRange: "$28 – $35 / hour",
    description:
      "Act as a bridge between our organization and First Nations, Métis, and Inuit communities. Provide cultural advisory services, facilitate workshops, and ensure our programs remain culturally relevant.",
    status: "Draft",
    postedDate: "2026-08-28",
    applicantCount: 0,
  },
  {
    id: "emp-job-003",
    title: "Administrative Coordinator",
    company: "Northern Health Services",
    location: "Thunder Bay, ON",
    employmentType: "Contract",
    category: "administration",
    salaryRange: "$45,000 – $50,000",
    description:
      "Support day-to-day administrative operations including scheduling, correspondence, grant reporting, and event logistics for our regional office.",
    status: "Closed",
    postedDate: "2026-07-15",
    applicantCount: 2,
  },
];
