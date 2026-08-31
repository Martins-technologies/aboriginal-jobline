import { useEffect, useRef } from "react";
import { X, FileText, Phone, Mail, MapPin, Briefcase, GraduationCap, ChevronRight } from "lucide-react";
import ApplicantStageBadge from "./ApplicantStageBadge";
import Button from "../common/Button";
import { EMPLOYER_STAGES } from "../../context/EmployerDataContext";

/**
 * ApplicantProfileDrawer — slide-over panel (right-side on desktop, full-screen on mobile)
 * showing full candidate detail when "View Profile" is clicked.
 *
 * Includes:
 *   - Contact info, resume filename/preview, skills
 *   - Work experience + education (same shape as Job Seeker Dashboard's My Profile)
 *   - Stage-change control (select from all stages)
 *   - Recruiter's private notes textarea
 */
export default function ApplicantProfileDrawer({
  applicant,
  onClose,
  onStageChange,
  onNotesChange,
}) {
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Trap focus and handle Escape key
  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!applicant) return null;

  const {
    id,
    name,
    email,
    phone,
    location,
    resumeFilename,
    skills = [],
    experience = [],
    education = [],
    stage,
    recruiterNotes = "",
  } = applicant;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Applicant profile: ${name}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl sm:inset-y-0"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/8 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white"
              aria-hidden="true"
            >
              {name.trim()[0]?.toUpperCase()}
            </span>
            <div>
              <h2 className="font-serif text-lg font-bold text-primary">{name}</h2>
              <ApplicantStageBadge stage={stage} />
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Close profile drawer"
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-primary/5 hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 px-6 py-6">
          {/* Contact Info */}
          <section>
            <h3 className="mb-3 font-serif text-base font-bold text-primary">Contact Information</h3>
            <ul className="space-y-2 text-sm">
              {email && (
                <li className="flex items-center gap-2 text-body">
                  <Mail className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="hover:text-accent hover:underline">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2 text-body">
                  <Phone className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  {phone}
                </li>
              )}
              {location && (
                <li className="flex items-center gap-2 text-body">
                  <MapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  {location}
                </li>
              )}
              {resumeFilename && (
                <li className="flex items-center gap-2 text-body">
                  <FileText className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  <button
                    type="button"
                    className="font-medium text-accent hover:text-accent/80 hover:underline"
                    onClick={() =>
                      alert(`Resume preview coming soon: ${resumeFilename}`)
                    }
                  >
                    {resumeFilename}
                  </button>
                  <span className="text-xs text-muted">(preview placeholder)</span>
                </li>
              )}
            </ul>
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="mb-3 font-serif text-base font-bold text-primary">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section>
              <h3 className="mb-3 font-serif text-base font-bold text-primary">
                <span className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted" aria-hidden="true" />
                  Work Experience
                </span>
              </h3>
              <ul className="space-y-4">
                {experience.map((exp) => (
                  <li key={exp.id} className="rounded-xl border border-black/8 p-4">
                    <p className="font-semibold text-primary">{exp.jobTitle}</p>
                    <p className="text-sm text-muted">
                      {exp.company} · {exp.dates}
                    </p>
                    {exp.description && (
                      <p className="mt-2 text-sm leading-relaxed text-body">{exp.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="mb-3 font-serif text-base font-bold text-primary">
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted" aria-hidden="true" />
                  Education
                </span>
              </h3>
              <ul className="space-y-3">
                {education.map((edu) => (
                  <li key={edu.id} className="rounded-xl border border-black/8 p-4">
                    <p className="font-semibold text-primary">{edu.degree}</p>
                    <p className="text-sm text-muted">
                      {edu.institution} · {edu.year}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Stage Change */}
          <section>
            <h3 className="mb-3 font-serif text-base font-bold text-primary">Pipeline Stage</h3>
            <div className="flex flex-wrap gap-2">
              {EMPLOYER_STAGES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onStageChange?.(id, s)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    s === stage
                      ? "border-primary bg-primary text-white"
                      : "border-black/10 bg-white text-body hover:border-primary/40 hover:text-primary"
                  }`}
                  aria-pressed={s === stage}
                >
                  {s === stage && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
                  {s}
                </button>
              ))}
            </div>
          </section>

          {/* Recruiter Notes */}
          <section>
            <h3 className="mb-3 font-serif text-base font-bold text-primary">Recruiter Notes</h3>
            <p className="mb-2 text-xs text-muted">Private notes — not visible to the candidate.</p>
            <textarea
              rows={4}
              defaultValue={recruiterNotes}
              onChange={(e) => onNotesChange?.(id, e.target.value)}
              placeholder="Add your private notes about this candidate here…"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-body placeholder:text-muted/70 focus:border-primary focus:outline-none"
            />
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-black/8 bg-white px-6 py-4">
          <Button variant="outline" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </aside>
    </>
  );
}
