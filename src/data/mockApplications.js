/**
 * Mock application data for the Job Seeker Dashboard.
 * Each entry represents a job the user has applied to.
 * Structured so real API persistence can replace this in-memory seed later.
 */
export const mockApplications = [
  {
    id: "app-001",
    jobId: "elementary-teacher",
    title: "Elementary Teacher",
    company: "Turtle Island Education Circle",
    location: "Toronto, ON",
    type: "Full-time",
    icon: "book-open",
    status: "In Review",
    dateApplied: "2026-08-18",
  },
  {
    id: "app-002",
    jobId: "community-support-worker",
    title: "Community Support Worker",
    company: "Hopewell Indigenous Services",
    location: "Vancouver, BC",
    type: "Part-time",
    icon: "heart",
    status: "Interview",
    dateApplied: "2026-08-14",
  },
  {
    id: "app-003",
    jobId: "remote-administrative-coordinator",
    title: "Remote Administrative Coordinator",
    company: "NationConnect Staffing",
    location: "Remote, Canada",
    type: "Full-time",
    icon: "globe",
    status: "Applied",
    dateApplied: "2026-08-20",
  },
];
