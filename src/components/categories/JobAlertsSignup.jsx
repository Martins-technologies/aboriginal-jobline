import { Bell } from "lucide-react";
import NewsletterForm from "../forms/NewsletterForm";

export default function JobAlertsSignup() {
  return (
    <aside className="rounded-2xl bg-white p-6 shadow-sm">
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Bell className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="font-serif text-2xl text-primary">Job Alerts</h3>
      <p className="mt-2 mb-4 text-sm text-muted">
        Get new job opportunities sent directly to your inbox.
      </p>
      <NewsletterForm
        id="job-alerts-email"
        layout="stacked"
        buttonLabel="Sign Up for Alerts"
        buttonVariant="primary"
        placeholder="Enter your email address"
        successMessage="You're signed up for job alerts."
      />
    </aside>
  );
}
