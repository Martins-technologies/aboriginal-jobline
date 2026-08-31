import { CalendarDays, ChevronRight, FileText, User } from "lucide-react";
import ApplicantStageBadge from "./ApplicantStageBadge";
import Button from "../common/Button";
import { EMPLOYER_STAGES } from "../../context/EmployerDataContext";

/**
 * ApplicantListItem — a candidate row used in both per-posting and all-applicants views.
 * Shows: name, applied role (via jobTitle lookup), applied date, stage badge,
 * and quick actions (Advance Stage, Reject, View Profile).
 */
export default function ApplicantListItem({
  applicant,
  jobTitle,
  onAdvance,
  onReject,
  onViewProfile,
}) {
  const { id, name, appliedDate, stage, resumeFilename } = applicant;

  const isAtOffer = stage === "Offer";
  const isRejected = stage === "Rejected";
  const canAdvance = !isAtOffer && !isRejected;

  const nextStage = canAdvance
    ? EMPLOYER_STAGES[EMPLOYER_STAGES.indexOf(stage) + 1]
    : null;

  return (
    <article className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-black/6 py-4 last:border-0">
      {/* Avatar */}
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
        aria-hidden="true"
      >
        {name.trim()[0]?.toUpperCase()}
      </span>

      {/* Name + meta */}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-primary">{name}</p>
        <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted">
          {jobTitle && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3 shrink-0" aria-hidden="true" />
              {jobTitle}
            </span>
          )}
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3 shrink-0" aria-hidden="true" />
            Applied {appliedDate}
          </span>
          {resumeFilename && (
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3 shrink-0" aria-hidden="true" />
              {resumeFilename}
            </span>
          )}
        </div>
      </div>

      {/* Stage badge */}
      <ApplicantStageBadge stage={stage} />

      {/* Quick actions */}
      <div className="flex flex-wrap items-center gap-2">
        {canAdvance && (
          <button
            type="button"
            onClick={() => onAdvance?.(id)}
            className="flex items-center gap-1 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-body transition-colors hover:border-primary/30 hover:text-primary"
            aria-label={`Advance ${name} to ${nextStage}`}
          >
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            → {nextStage}
          </button>
        )}
        {!isRejected && (
          <button
            type="button"
            onClick={() => onReject?.(applicant)}
            className="rounded-xl border border-transparent px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:border-accent/20 hover:bg-accent/5"
            aria-label={`Reject ${name}`}
          >
            Reject
          </button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile?.(applicant)}
        >
          View Profile
        </Button>
      </div>
    </article>
  );
}
