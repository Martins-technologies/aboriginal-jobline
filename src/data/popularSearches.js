export const popularSearches = [
  { id: "toronto", label: "Indigenous jobs in Toronto", query: { q: "Toronto" } },
  { id: "healthcare", label: "Aboriginal healthcare jobs", query: { category: "healthcare" } },
  { id: "remote-admin", label: "Remote administration jobs", query: { category: "office-administration", workplace: "Remote" } },
  { id: "trades-ab", label: "Skilled trades jobs in Alberta", query: { category: "skilled-trades", location: "alberta" } },
  { id: "hospitality-bc", label: "Hospitality jobs in BC", query: { category: "hospitality", location: "british-columbia" } },
  { id: "education", label: "Education jobs in Ontario", query: { category: "education", location: "ontario" } },
];

export const popularTags = [
  { id: "full-time", label: "Full-time", icon: "clock", query: { type: "Full-time" }, tone: "text-primary border-primary/30" },
  { id: "part-time", label: "Part-time", icon: "clock", query: { type: "Part-time" }, tone: "text-accent border-accent/35" },
  { id: "remote", label: "Remote", icon: "home", query: { workplace: "Remote" }, tone: "text-primary border-primary/30" },
  { id: "healthcare", label: "Healthcare", icon: "heart-pulse", query: { category: "healthcare" }, tone: "text-accent border-accent/35" },
  { id: "administration", label: "Administration", icon: "user", query: { category: "office-administration" }, tone: "text-body border-black/20" },
  { id: "trades", label: "Trades", icon: "wrench", query: { category: "skilled-trades" }, tone: "text-accent-light border-accent-light/50" },
  { id: "hospitality", label: "Hospitality", icon: "bell", query: { category: "hospitality" }, tone: "text-primary border-primary/30" },
];
