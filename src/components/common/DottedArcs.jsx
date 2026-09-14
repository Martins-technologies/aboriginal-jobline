export default function DottedArcs({ className = "" }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      fill="none"
    >
      <g stroke="#D9A441" strokeWidth="1.6" strokeDasharray="2.2 11" strokeLinecap="round" opacity="0.38">
        <circle cx="1120" cy="-20" r="160" />
        <circle cx="1120" cy="-20" r="240" />
        <circle cx="1120" cy="-20" r="320" />
        <circle cx="1120" cy="-20" r="400" />
        <circle cx="60" cy="820" r="180" />
        <circle cx="60" cy="820" r="260" />
        <circle cx="60" cy="820" r="340" />
        <circle cx="60" cy="820" r="420" />
      </g>
    </svg>
  );
}
