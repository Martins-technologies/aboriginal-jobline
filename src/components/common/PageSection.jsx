export default function PageSection({
  id,
  as: Component = "section",
  className = "",
  innerClassName = "",
  contained = true,
  children,
}) {
  return (
    <Component id={id} className={`relative ${className}`}>
      {contained ? (
        <div className={`container-page ${innerClassName}`}>{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}
