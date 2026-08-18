function LeafPattern({ color = "white", opacity = 0.25 }) {
  return (
    <g opacity={opacity} fill="none" stroke={color} strokeWidth="1.2">
      <path d="M20 40c18-6 28-22 28-38" />
      <path d="M20 40c8-16 6-30-2-40" />
      <path d="M20 18h18" />
      <path d="M48 70c22-8 34-28 32-48" />
      <path d="M48 70c8-18 4-34-8-46" />
      <path d="M52 46h22" />
      <path d="M12 92c20-4 34-20 36-38" />
      <path d="M12 92c10-16 8-32 0-44" />
    </g>
  );
}

export default function WaveDecoration({
  variant = "hero",
  className = "",
}) {
  if (variant === "cta") {
    return (
      <svg
        viewBox="0 0 520 220"
        className={className}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M80 220C40 140 120 40 220 70c70 22 90 90 170 70 70-18 90-90 130-70v150H80Z"
          fill="#C1440E"
        />
        <path
          d="M140 220C110 160 180 70 270 95c70 20 80 80 150 62 60-16 80-70 100-50v113H140Z"
          fill="#D9A441"
        />
        <g transform="translate(220 40) scale(1.4)">
          <LeafPattern />
        </g>
      </svg>
    );
  }

  if (variant === "section") {
    return (
      <svg
        viewBox="0 0 280 420"
        className={className}
        aria-hidden="true"
        fill="none"
      >
        <path
          d="M280 0C180 40 120 90 90 170c-28 74 10 130 70 170 40 26 80 40 120 50V0Z"
          fill="#0F3D3E"
        />
        <path
          d="M280 40C200 80 150 130 130 200c-22 72 18 120 80 150 40 20 50 20 70 22V40Z"
          fill="#C1440E"
        />
        <path
          d="M280 90C220 120 180 160 170 220c-12 68 30 110 80 130 18 8 22 8 30 8V90Z"
          fill="#D9A441"
        />
        <g transform="translate(150 70)">
          <LeafPattern color="white" opacity="0.35" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 420 260"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M0 180C60 120 90 40 170 50c70 8 80 90 160 70 70-16 90-70 90-70v210H0V180Z"
        fill="#0F3D3E"
      />
      <path
        d="M40 220C90 150 140 80 210 95c70 14 80 80 150 60 50-14 60-40 60-40v145H40V220Z"
        fill="#C1440E"
      />
      <path
        d="M90 250C130 190 180 130 250 145c60 12 70 60 130 48 20-4 40-16 40-16v83H90V250Z"
        fill="#D9A441"
      />
      <g transform="translate(150 90) scale(1.3)">
        <LeafPattern color="white" opacity="0.3" />
      </g>
    </svg>
  );
}
