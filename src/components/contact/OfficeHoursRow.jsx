import { Clock } from "lucide-react";
import { contactInfo } from "../../data/contactInfo";

export default function OfficeHoursRow() {
  return (
    <div className="flex items-start gap-3 pt-1">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-primary">
        <Clock className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p className="font-sans text-sm font-semibold text-primary">Office Hours</p>
        <ul className="mt-0.5 space-y-0.5 text-sm text-muted">
          {contactInfo.officeHours.map(({ day, hours }) => (
            <li key={day}>{day}: {hours}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
