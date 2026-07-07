/**
 * Decorative teal + orange layered waves with a dotted "trail" —
 * the signature motif from the mockup, layered over hero imagery.
 */
export default function WaveArt({ className = '' }) {
  return (
    <svg viewBox="0 0 420 260" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path d="M420 30C340 60 300 140 250 190S130 260 60 260h360V30z" fill="#D8862B" />
      <path
        d="M420 0C330 30 290 120 235 175S110 255 30 260h390V0z"
        fill="none"
        stroke="#B7601C"
        strokeWidth="3"
        opacity="0.5"
      />
      <path d="M420 -10C355 25 315 95 265 150S150 245 80 260h340V-10z" fill="#17494D" />
      <path
        d="M420 10C365 40 330 100 282 152S180 240 115 258"
        fill="none"
        stroke="#FBF3E7"
        strokeWidth="3"
        strokeDasharray="1 14"
        strokeLinecap="round"
      />
      <path d="M420 70C370 95 340 145 300 185s-80 60-130 73h230V70z" fill="#C14817" />
      <path d="M420 130c-40 18-70 55-105 85s-60 38-90 43h195v-128z" fill="#D99B2B" />
    </svg>
  )
}