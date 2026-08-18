import { images } from "../../data/images";

export default function ContactIllustration({ className = "" }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-md ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        fill="none"
      >
        <g stroke="#D9A441" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" opacity="0.45">
          <circle cx="200" cy="200" r="168" />
          <circle cx="200" cy="200" r="188" />
          <circle cx="200" cy="200" r="208" />
        </g>
        <circle
          cx="200"
          cy="200"
          r="148"
          stroke="#0F3D3E"
          strokeWidth="2"
          strokeDasharray="3 9"
          opacity="0.85"
        />
      </svg>
      <div className="absolute inset-[8%] flex items-center justify-center">
        <img
          src={images.contactIllustration.src}
          alt={images.contactIllustration.alt}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
