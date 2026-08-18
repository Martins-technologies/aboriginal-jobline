import SectionEyebrow from "./SectionEyebrow";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  action,
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <SectionEyebrow className={isCenter ? "" : "justify-start"}>{eyebrow}</SectionEyebrow>
      ) : null}
      <Heading className={`${eyebrow ? "mt-4" : ""} section-title`}>{title}</Heading>
      {description ? <p className="section-copy">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
