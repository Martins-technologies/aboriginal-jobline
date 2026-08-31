import { Briefcase, Bookmark, MessageSquare, Award } from "lucide-react";

const CARDS = [
  { key: "applications", label: "Applications", icon: Briefcase, color: "text-primary bg-primary/10" },
  { key: "savedJobs",    label: "Saved Jobs",   icon: Bookmark,       color: "text-accent-light bg-accent-light/15" },
  { key: "interviews",   label: "Interviews",   icon: MessageSquare,  color: "text-accent bg-accent/10" },
  { key: "offers",       label: "Offers",       icon: Award,          color: "text-green-700 bg-green-50" },
];

/**
 * StatCardRow — 4 stat cards driven from DashboardDataContext stats.
 * Uses surface-card + existing palette tokens.
 */
export default function StatCardRow({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-6 lg:grid-cols-4 lg:px-8">
      {CARDS.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="surface-card flex flex-col gap-3 p-4">
          <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-serif text-2xl font-bold text-primary">
              {stats[key] ?? 0}
            </p>
            <p className="mt-0.5 text-xs font-medium text-muted">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
