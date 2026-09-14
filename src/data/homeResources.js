import { resources } from "./resources";

const byId = (id) => resources.find((resource) => resource.id === id);

/** Homepage — Resources & Insights (jobseeker / employee / community images). */
export const homeInsightResources = [
  {
    ...byId("resume-tips"),
    tag: "JOB SEEKERS",
    tagColor: "bg-primary",
    image: "/jobseeker.jfif",
    imageAlt: "Traditional woven basket with pine branches",
    description:
      "Highlight your strengths, skills, and community experience with confidence.",
  },
  {
    ...byId("inclusive-hiring-practices"),
    tag: "EMPLOYERS",
    tagColor: "bg-accent",
    image: "/employee.jfif",
    imageAlt: "Two professionals having a conversation at a desk",
    description:
      "Create workplaces where Indigenous talent thrives and communities prosper.",
  },
  {
    ...byId("career-growth-communities"),
    tag: "COMMUNITY",
    tagColor: "bg-accent-light",
    image: "/community.jfif",
    imageAlt: "Turquoise mountain lake with snow-capped peaks",
    description:
      "Explore opportunities, training, and pathways to long-term success.",
  },
];

/** Browse jobs page — career support cards (girl1–3 images). */
export const browseCareerResources = [
  {
    ...byId("resume-tips"),
    image: "/girl1.jfif",
    imageClass: "object-center",
    imageAlt: "Aboriginal job seeker exploring career resources",
    description:
      "Highlight your strengths, skills, and community experience with confidence.",
  },
  {
    ...byId("interview-prep"),
    image: "/girl2.jfif",
    imageClass: "object-center",
    imageAlt: "Job seeker preparing for an interview with confidence",
    description:
      "Practical tips to help you feel prepared, answer with clarity, and make a great impression.",
  },
  {
    ...byId("inclusive-hiring"),
    image: "/girl3.jfif",
    imageClass: "object-center",
    imageAlt: "Employer reviewing inclusive hiring resources",
    description:
      "Tools and best practices for employers committed to inclusive and equitable hiring practices.",
  },
];
