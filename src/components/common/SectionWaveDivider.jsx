export default function SectionWaveDivider({ className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        className="block w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,58 C180,108 320,8 500,52 C680,96 820,18 1000,58 C1140,90 1300,28 1440,48 L1440,120 L0,120 Z"
          fill="#0F3D3E"
        />
        <path
          d="M0,58 C180,108 320,8 500,52 C680,96 820,18 1000,58 C1140,90 1300,28 1440,48"
          fill="none"
          stroke="#FBF3E7"
          strokeWidth="2.4"
          strokeDasharray="3 11"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
