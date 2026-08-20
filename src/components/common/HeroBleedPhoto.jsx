export default function HeroBleedPhoto({ src, className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 right-0 w-full sm:w-[70%] lg:w-1/2 ${className}`}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className="hero-photo-blend h-full w-full object-cover object-[center_center]"
      />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
    </div>
  );
}
