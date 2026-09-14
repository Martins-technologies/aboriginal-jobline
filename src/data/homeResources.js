import { resources } from "./resources";

const byId = (id) => resources.find((resource) => resource.id === id);

export const homeResources = [
  {
    ...byId("resume-tips"),
    tag: "JOB SEEKERS",
    description:
      "Highlight your strengths, skills, and community experience with confidence.",
  },
  byId("inclusive-hiring-practices"),
  byId("career-growth-communities"),
];
