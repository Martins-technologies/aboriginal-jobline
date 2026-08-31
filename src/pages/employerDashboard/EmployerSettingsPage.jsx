import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Plus, UserPlus, UserX } from "lucide-react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Button from "../../components/common/Button";
import { useAuth } from "../../lib/auth/AuthContext";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-body placeholder:text-muted/80 focus:border-primary focus:outline-none";

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

/**
 * EmployerSettingsPage — mirrors Job Seeker Settings page structure.
 * Account, Notifications, Team Members, and Danger Zone (Sign Out + Delete Account).
 */
export default function EmployerSettingsPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  // Account state
  const [email, setEmail] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [accountMsg, setAccountMsg] = useState(null);

  // Notification state
  const [notifications, setNotifications] = useState({
    candidateApplies: true,
    weeklyApplicantSummary: true,
    postingExpirationReminders: true,
    marketingUpdates: false,
  });

  // Team members state
  const [teamMembers, setTeamMembers] = useState([
    { id: "tm-1", name: "Recruiter Admin", email: "recruiter@northernhealth.ca", role: "Admin", status: "Active" },
  ]);
  const [newInviteEmail, setNewInviteEmail] = useState("");
  const [showInviteForm, setShowInviteForm] = useState(false);

  // Delete account modal state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const setNotif = (key) => (val) =>
    setNotifications((n) => ({ ...n, [key]: val }));

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

  const handleInviteTeammate = (e) => {
    e.preventDefault();
    if (!newInviteEmail.trim()) return;
    setTeamMembers((prev) => [
      ...prev,
      {
        id: `tm-${Date.now()}`,
        name: newInviteEmail.split("@")[0],
        email: newInviteEmail.trim(),
        role: "Recruiter",
        status: "Pending Invite",
      },
    ]);
    setNewInviteEmail("");
    setShowInviteForm(false);
  };

  const handleRemoveTeammate = (id) => {
    setTeamMembers((prev) => prev.filter((tm) => tm.id !== id));
  };

  const handleSignOut = () => {
    signOut();
    navigate("/", { replace: true });
  };

  const handleDeleteAccount = () => {
    signOut();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Settings"
        subtitle="Manage your employer account, notifications, and team access."
      />

      <div className="space-y-6 px-6 py-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Account                                                           */}
        {/* ---------------------------------------------------------------- */}
        <section className="surface-card p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-primary">Account</h2>
          <p className="mt-1 text-sm text-muted">Update your login email or change your password.</p>

          <form onSubmit={handleAccountSave} noValidate className="mt-5 space-y-4">
            <div>
              <label htmlFor="emp-settings-email" className="mb-1.5 block text-sm font-semibold text-primary">
                Login Email Address
              </label>
              <input
                id="emp-settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recruiter@company.ca"
                className={inputClass}
                autoComplete="email"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="emp-settings-pwd" className="mb-1.5 block text-sm font-semibold text-primary">
                  New Password
                </label>
                <input
                  id="emp-settings-pwd"
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Enter new password"
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="emp-settings-cpwd" className="mb-1.5 block text-sm font-semibold text-primary">
                  Confirm New Password
                </label>
                <input
                  id="emp-settings-cpwd"
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
          <p className="mt-1 text-sm text-muted">Choose when and how you receive applicant alerts.</p>

          <div className="mt-4 divide-y divide-black/8">
            <Toggle
              id="notif-candidate-applies"
              label="New applicant alerts"
              description="Email me as soon as a candidate applies to any active job posting."
              checked={notifications.candidateApplies}
              onChange={setNotif("candidateApplies")}
            />
            <Toggle
              id="notif-weekly-summary"
              label="Weekly applicant digest"
              description="Email me a weekly summary of applicant volume and pipeline status."
              checked={notifications.weeklyApplicantSummary}
              onChange={setNotif("weeklyApplicantSummary")}
            />
            <Toggle
              id="notif-posting-exp"
              label="Posting expiration reminders"
              description="Remind me 5 days before a job posting is set to expire."
              checked={notifications.postingExpirationReminders}
              onChange={setNotif("postingExpirationReminders")}
            />
            <Toggle
              id="notif-marketing"
              label="Platform updates & employer tips"
              description="Receive occasional updates about new hiring features and Indigenous recruitment resources."
              checked={notifications.marketingUpdates}
              onChange={setNotif("marketingUpdates")}
            />
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Team Members                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="surface-card p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-primary">Team Members</h2>
              <p className="mt-1 text-sm text-muted">Manage recruiters and hiring team access.</p>
            </div>
            {!showInviteForm && (
              <Button
                variant="outline"
                size="sm"
                icon={UserPlus}
                onClick={() => setShowInviteForm(true)}
              >
                Invite Teammate
              </Button>
            )}
          </div>

          {showInviteForm && (
            <form onSubmit={handleInviteTeammate} className="mt-4 flex flex-wrap gap-3">
              <input
                type="email"
                value={newInviteEmail}
                onChange={(e) => setNewInviteEmail(e.target.value)}
                placeholder="colleague@company.ca"
                className={`flex-1 min-w-[220px] ${inputClass}`}
                required
              />
              <Button type="submit" variant="secondary" size="sm" icon={Plus}>
                Send Invite
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowInviteForm(false)}
              >
                Cancel
              </Button>
            </form>
          )}

          <ul className="mt-4 divide-y divide-black/8 text-sm">
            {teamMembers.map((tm) => (
              <li key={tm.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold text-primary">{tm.name}</p>
                  <p className="text-xs text-muted">
                    {tm.email} · <span className="font-medium text-body">{tm.role}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      tm.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {tm.status}
                  </span>
                  {tm.role !== "Admin" && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTeammate(tm.id)}
                      className="rounded p-1 text-muted hover:text-accent"
                      aria-label={`Remove ${tm.name}`}
                    >
                      <UserX className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Danger Zone                                                       */}
        {/* ---------------------------------------------------------------- */}
        <section className="surface-card p-6 sm:p-8 border-l-4 border-accent">
          <h2 className="font-serif text-xl font-bold text-primary">Danger Zone</h2>
          <p className="mt-1 text-sm text-muted">
            Sign out of your session or permanently delete your employer account.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button type="button" variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>

            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Delete Company Account
            </button>
          </div>
        </section>
      </div>

      {/* Delete Account Confirmation Dialog */}
      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Company Account?"
          description="This action is permanent and cannot be undone. All company job postings, applicant records, and recruiter settings will be deleted."
          confirmLabel="Permanently Delete Account"
          dangerous
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
