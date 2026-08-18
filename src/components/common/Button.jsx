import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary/90 border border-transparent",
  secondary:
    "bg-accent text-white hover:bg-accent/90 border border-transparent",
  outline:
    "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
  "outline-white":
    "bg-transparent text-white border border-white hover:bg-white hover:text-primary",
  white: "bg-white text-primary hover:bg-background border border-transparent",
  ghost: "bg-transparent text-accent hover:text-accent/80 border-0 px-0",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  className = "",
  icon: Icon,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
