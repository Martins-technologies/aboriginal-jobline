import { images } from "../../data/images";

export default function WaveGraphic({ className = "" }) {
  return (
    <img
      src={images.waveGraphic.src}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
