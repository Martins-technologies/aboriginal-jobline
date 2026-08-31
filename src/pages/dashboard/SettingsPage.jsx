import { useState } from "react";
import { Check } from "lucide-react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import Button from "../../components/common/Button";
import { useAuth } from "../../lib/auth/AuthContext";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------------------------
// Shared input class
// ---------------------------------------------------------------------------
const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-body placeholder:text-muted/80 focus:border-primary focus:outline-none";

// ---------------------------------------------------------------------------
// Toggle switch component
// ---------------------------------------------------------------------------
function Toggle({ id, label, description, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start justify-between gap-4 py-3"
    >
      <div>
        <p className="text-sm font-semibold text-body">{label}</p>
        {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
      </div>
      <div className="relative shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`h-6 w-11 rounded-full transition-colors ${checked ? "bg-primary" : "bg-black/20"}`}
        />
        <div
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
    </label>
  );
}

// ---------------------------------------------------------------------------
// SettingsPage — Account + Notifications only. No Delete Account.
// ---------------------------------------------------------------------------
export default function SettingsPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  // Account form
  const [email, setEmail] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [accountMsg, setAccountMsg] = useState(null);

  // Notification toggles
  const [notifications, setNotifications] = useState({
    newJobMatches: true,
    applicationUpdates: true,
    weeklyDigest: false,
    employerMessages: true,
  });

  const setNotif = (key) => (val) => setNotifications((n) => ({ ...n, [key]: val }));

  const handleAccountSave = (e) => {
    e.preventDefault();
    if (newPwd && newPwd !== confirmPwd) {
      setAccountMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    setAccountMsg({ type: "success", text: "Account settings updated!" });
    setTimeout(() => setAccountMsg(null), 3000);
    setNewPwd("");
    setConfirmPwd("");
  };

  const handleSignOut = () => {
    signOut();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Settings"
        subtitle="Manage your account and notification preferences."
      />

      <div className="space-y-6 px-6 py-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Account                                                           */}
        {/* ---------------------------------------------------------------- */}
        <section className="surface-card p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-primary">Account</h2>
          <p className="mt-1 text-sm text-muted">Update your email address or password.</p>

          <form onSubmit={handleAccountSave} noValidate className="mt-5 space-y-4">
            <div>
              <label htmlFor="settings-email" className="mb-1.5 block text-sm font-semibold text-primary">
                New Email Address
              </label>
              <input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new email address"
                className={inputClass}
                autoComplete="email"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="settings-new-pwd" className="mb-1.5 block text-sm font-semibold text-primary">
                  New Password
                </label>
                <input
                  id="settings-new-pwd"
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Enter new password"
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="settings-confirm-pwd" className="mb-1.5 block text-sm font-semibold text-primary">
                  Confirm New Password
                </label>
                <input
                  id="settings-confirm-pwd"
                  type="password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  placeholder="Re-enter new password"
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" variant="secondary">
                Save Changes
              </Button>
              {accountMsg && (
                <span
                  className={`text-sm font-semibold ${
                    accountMsg.type === "error" ? "text-accent" : "text-green-600"
                  }`}
                >
                  {accountMsg.type === "success" && (
                    <Check className="mr-1 inline h-4 w-4" aria-hidden="true" />
                  )}
                  {accountMsg.text}
                </span>
              )}
            </div>
          </form>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Notifications                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="surface-card p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-primary">Notifications</h2>
          <p className="mt-1 text-sm text-muted">Choose what you'd like to hear about.</p>

          <div className="mt-4 divide-y divide-black/8">
            <Toggle
              id="notif-job-matches"
              label="New job matches"
              description="Email me when new jobs matching my profile are posted."
              checked={notifications.newJobMatches}
              onChange={setNotif("newJobMatches")}
            />
            <Toggle
              id="notif-app-updates"
              label="Application status updates"
              description="Email me when an employer updates the status of my application."
              checked={notifications.applicationUpdates}
              onChange={setNotif("applicationUpdates")}
            />
            <Toggle
              id="notif-weekly"
              label="Weekly job digest"
              description="A weekly summary of new openings from inclusive employers."
              checked={notifications.weeklyDigest}
              onChange={setNotif("weeklyDigest")}
            />
            <Toggle
              id="notif-employer-msg"
              label="Employer messages"
              description="Notify me when an employer sends me a message."
              checked={notifications.employerMessages}
              onChange={setNotif("employerMessages")}
            />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Sign Out                                                           */}
        {/* ---------------------------------------------------------------- */}
        <section className="surface-card p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-primary">Sign Out</h2>
          <p className="mt-1 text-sm text-muted">
            Sign out of your account on this device.
          </p>
          <div className="mt-4">
            <Button type="button" variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
