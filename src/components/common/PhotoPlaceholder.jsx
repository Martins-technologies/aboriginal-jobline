import WaveArt from './WaveArt'

const TONES = {
  warm: 'from-cream-200 via-[#e8d3b4] to-[#c8a877]',
  pine: 'from-pine-600 via-pine-700 to-pine-800',
  gold: 'from-gold-400/70 via-[#d9b87a] to-[#b98a3e]',
  rust: 'from-rust-500/80 via-[#c9714a] to-[#8f3a17]',
}

/**
 * Stands in for the mockup photography (drop real images in /src/assets
 * and swap this component). Renders a soft gradient with the wave motif.
 */
export default function PhotoPlaceholder({ tone = 'warm', label, wave = true, className = '' }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden bg-gradient-to-br ${TONES[tone]} ${className}`}
    >
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:22px_22px]" />
      {wave && <WaveArt className="absolute -bottom-1 -right-1 h-3/4 w-2/3" />}
    </div>
  )
}