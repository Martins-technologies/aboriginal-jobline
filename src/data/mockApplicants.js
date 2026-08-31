/**
 * mockApplicants.js
 * Seed data for the Employer Dashboard applicant views.
 * Shape mirrors the Job Seeker Dashboard's profile data model so a future
 * API integration can reconcile both dashboards' data.
 *
 * Employer-facing pipeline stages:
 *   New → Reviewed → Shortlisted → Interview → Offer → Rejected
 *
 * Seeker-facing equivalents (for future backend reconciliation):
 *   Applied → In Review → Interview → Offer → Not Selected
 */
export const mockApplicants = [
  {
    id: "appl-001",
    jobId: "emp-job-001",
    appliedDate: "2026-08-21",
    stage: "Interview",
    recruiterNotes: "Strong cultural ties to the community. Impressive references.",
    // Candidate profile (mirrors Job Seeker Dashboard's My Profile shape)
    name: "Melissa Redcloud",
    email: "melissa.redcloud@email.com",
    phone: "204-555-0182",
    location: "Winnipeg, MB",
    resumeFilename: "melissa_redcloud_resume.pdf",
    skills: ["Community Outreach", "Program Coordination", "Microsoft Office", "Cree Language"],
    experience: [
      {
        id: "exp-001",
        jobTitle: "Outreach Worker",
        company: "First Nations Wellness Centre",
        dates: "2023 – 2026",
        description: "Coordinated health programs for urban Indigenous youth and Elders.",
      },
    ],
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Social Work",
        institution: "University of Manitoba",
        year: "2022",
      },
    ],
  },
  {
    id: "appl-002",
    jobId: "emp-job-001",
    appliedDate: "2026-08-22",
    stage: "Shortlisted",
    recruiterNotes: "",
    name: "James Thunderbird",
    email: "james.thunderbird@email.com",
    phone: "204-555-0247",
    location: "Portage la Prairie, MB",
    resumeFilename: "james_thunderbird_cv.pdf",
    skills: ["Public Speaking", "Grant Writing", "Event Planning"],
    experience: [
      {
        id: "exp-001",
        jobTitle: "Community Program Lead",
        company: "Métis Nation Manitoba",
        dates: "2021 – 2025",
        description: "Managed $500K+ grant-funded programs serving 2,000+ community members.",
      },
    ],
    education: [
      {
        id: "edu-001",
        degree: "Diploma in Indigenous Community Development",
        institution: "Red River College",
        year: "2020",
      },
    ],
  },
  {
    id: "appl-003",
    jobId: "emp-job-001",
    appliedDate: "2026-08-23",
    stage: "New",
    recruiterNotes: "",
    name: "Sarah Otter",
    email: "sarah.otter@email.com",
    phone: "431-555-0093",
    location: "Thompson, MB",
    resumeFilename: "sarah_otter_resume.pdf",
    skills: ["Communication", "Data Entry", "Cultural Facilitation"],
    experience: [
      {
        id: "exp-001",
        jobTitle: "Administrative Assistant",
        company: "Manitoba Indigenous Cultural Education Centre",
        dates: "2024 – 2026",
        description: "Supported daily operations and managed scheduling for senior staff.",
      },
    ],
    education: [],
  },
  {
    id: "appl-004",
    jobId: "emp-job-001",
    appliedDate: "2026-08-24",
    stage: "Reviewed",
    recruiterNotes: "Good experience but location may be a challenge.",
    name: "David Swifthawk",
    email: "david.swifthawk@email.com",
    phone: "807-555-0314",
    location: "Kenora, ON",
    resumeFilename: "david_swifthawk_resume.pdf",
    skills: ["Leadership", "Budget Management", "Stakeholder Relations", "Ojibwe Language"],
    experience: [
      {
        id: "exp-001",
        jobTitle: "Band Manager",
        company: "Wauzhushk Onigum Nation",
        dates: "2020 – 2026",
        description: "Oversaw all band operations including housing, health, and education programs.",
      },
    ],
    education: [
      {
        id: "edu-001",
        degree: "Master of Public Administration",
        institution: "Lakehead University",
        year: "2019",
      },
    ],
  },
  {
    id: "appl-005",
    jobId: "emp-job-003",
    appliedDate: "2026-07-16",
    stage: "Offer",
    recruiterNotes: "Excellent fit. Offer extended July 22.",
    name: "Angela Clearsky",
    email: "angela.clearsky@email.com",
    phone: "807-555-0456",
    location: "Thunder Bay, ON",
    resumeFilename: "angela_clearsky_resume.pdf",
    skills: ["Office Administration", "QuickBooks", "Scheduling", "Report Writing"],
    experience: [
      {
        id: "exp-001",
        jobTitle: "Office Coordinator",
        company: "Nishnawbe Aski Nation",
        dates: "2022 – 2026",
        description: "Managed executive calendars, grants reporting, and logistics for 15-person team.",
      },
    ],
    education: [
      {
        id: "edu-001",
        degree: "Office Administration Certificate",
        institution: "Confederation College",
        year: "2021",
      },
    ],
  },
  {
    id: "appl-006",
    jobId: "emp-job-003",
    appliedDate: "2026-07-17",
    stage: "Rejected",
    recruiterNotes: "Not enough relevant experience for this contract role.",
    name: "Tommy Birchbark",
    email: "tommy.birchbark@email.com",
    phone: "705-555-0127",
    location: "Sault Ste. Marie, ON",
    resumeFilename: "tommy_birchbark_resume.pdf",
    skills: ["Customer Service", "Data Entry"],
    experience: [],
    education: [
      {
        id: "edu-001",
        degree: "High School Diploma",
        institution: "Superior Collegiate and Vocational Institute",
        year: "2023",
      },
    ],
  },
];
