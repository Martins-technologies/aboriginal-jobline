import { Link } from "react-router-dom";
import { images } from "../../data/images";

export default function Logo({ variant = "dark", compact = false }) {
  const image = (
    <img
      src={images.logo.src}
      alt={images.logo.alt}
      className={`w-auto max-w-[168px] object-contain object-left sm:max-w-[210px] ${compact ? "h-8 sm:h-9" : "h-10 sm:h-11"}`}
    />
  );

  return (
    <Link to="/" className="inline-flex shrink-0 items-center" aria-label="Aboriginal Jobline home">
      {variant === "light" ? (
        <span className="inline-flex rounded-lg bg-white px-2 py-1">{image}</span>
      ) : (
        image
      )}
    </Link>
  );
}
