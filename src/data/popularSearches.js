export const popularSearches = [
  { id: "toronto", label: "Indigenous jobs in Toronto", query: { q: "Toronto" } },
  { id: "healthcare", label: "Aboriginal healthcare jobs", query: { category: "healthcare" } },
  { id: "remote-admin", label: "Remote administration jobs", query: { category: "office-administration", workplace: "Remote" } },
  { id: "trades-ab", label: "Skilled trades jobs in Alberta", query: { category: "skilled-trades", location: "alberta" } },
  { id: "hospitality-bc", label: "Hospitality jobs in BC", query: { category: "hospitality", location: "british-columbia" } },
  { id: "education", label: "Education jobs in Ontario", query: { category: "education", location: "ontario" } },
];

export const popularTags = [
  { id: "full-time", label: "Full-time", icon: "clock", query: { type: "Full-time" } },
  { id: "part-time", label: "Part-time", icon: "clock", query: { type: "Part-time" } },
  { id: "remote", label: "Remote", icon: "home", query: { workplace: "Remote" } },
  { id: "healthcare", label: "Healthcare", icon: "heart-pulse", query: { category: "healthcare" } },
  { id: "administration", label: "Administration", icon: "user", query: { category: "office-administration" } },
  { id: "trades", label: "Trades", icon: "wrench", query: { category: "skilled-trades" } },
  { id: "hospitality", label: "Hospitality", icon: "bell", query: { category: "hospitality" } },
];
