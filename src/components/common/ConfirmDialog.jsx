import { useEffect, useRef } from "react";
import Button from "./Button";

/**
 * ConfirmDialog — lightweight modal for destructive action confirmation.
 * Traps focus, closes on Escape, and blocks clicks on the backdrop.
 *
 * Props:
 *   title         — dialog heading
 *   description   — explanatory text
 *   confirmLabel  — label for the confirm button (default "Confirm")
 *   cancelLabel   — label for the cancel button (default "Cancel")
 *   dangerous     — if true, confirm button uses destructive (accent) style
 *   onConfirm     — called when the user confirms
 *   onCancel      — called when the user cancels or presses Escape
 */
export default function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  dangerous = false,
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const handler = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/10 bg-white p-6 shadow-xl sm:p-8"
      >
        <h2
          id="confirm-dialog-title"
          className="font-serif text-xl font-bold text-primary"
        >
          {title}
        </h2>
        {description && (
          <p
            id="confirm-dialog-desc"
            className="mt-2 text-sm leading-relaxed text-muted"
          >
            {description}
          </p>
        )}

        <div className="mt-6 flex flex-wrap-reverse justify-end gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-body transition-colors hover:border-primary/30 hover:text-primary"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              dangerous
                ? "bg-accent text-white hover:bg-accent/90"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}
