import { Link } from "react-router-dom";
import { Globe, Lock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import NewsletterForm from "../forms/NewsletterForm";
import LeafBranch from "../common/LeafBranch";
import { homeFooterConfig } from "../../data/footerConfigs";
import { getIcon } from "../../utils/icons";

const gridCols = {
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
};

function FooterList({ title, links, linkClass }) {
  return (
    <div>
      <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-accent">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLinks({ links, style, isLight }) {
  return (
    <div className="flex gap-2">
      {links.map((item) => {
        const Icon = getIcon(item.platform);
        const outlined = style === "outlined";
        return (
          <a
            key={item.platform}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label || item.platform}
            className={
              outlined
                ? isLight
                  ? "flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary hover:text-white"
                  : "flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-primary"
                : "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

export default function Footer({ config = homeFooterConfig }) {
  const {
    theme = "dark",
    brand,
    columns = [],
    contact,
    social,
    showNewsletter = false,
    copyrightYear = 2025,
  } = config;

  const isLight = theme === "light";
  const linkClass = isLight
    ? "text-sm text-body/75 transition-colors hover:text-primary"
    : "text-sm text-white/75 transition-colors hover:text-white";
  const mutedClass = isLight ? "text-body/75" : "text-white/75";

  // Compute dynamic column widths for 12-column grid system
  const navColumnCount = columns.length; // e.g. 3 or 2
  const hasSocialColumn = social?.placement === "column" && social.links?.length;

  let brandSpan = "lg:col-span-4";
  let linkSpan = "lg:col-span-2";
  let contactSpan = "lg:col-span-2";
  let socialColSpan = "lg:col-span-2";

  if (navColumnCount === 2 && !hasSocialColumn) {
    brandSpan = "lg:col-span-4";
    linkSpan = "lg:col-span-3";
    contactSpan = "lg:col-span-2";
  } else if (navColumnCount === 2 && hasSocialColumn) {
    brandSpan = "lg:col-span-3";
    linkSpan = "lg:col-span-2";
    contactSpan = "lg:col-span-3";
    socialColSpan = "lg:col-span-2";
  }

  return (
    <footer className={`relative overflow-hidden ${isLight ? "bg-background text-body" : "bg-primary text-white"}`}>
      {isLight ? (
        <LeafBranch className="pointer-events-none absolute -bottom-6 -right-4 h-48 w-40 text-accent-light sm:h-56 sm:w-48" />
      ) : null}

      <div className="container-page relative py-10 lg:py-12">
        {/* Newsletter Header Section if enabled */}
        {showNewsletter ? (
          <div
            className={`mb-10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border ${
              isLight
                ? "bg-primary/5 border-primary/15"
                : "bg-white/[0.06] border-white/12"
            }`}
          >
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <h3 className={`font-sans text-lg font-bold tracking-tight ${isLight ? "text-primary" : "text-white"}`}>
                  Stay Connected & Informed
                </h3>
                <p className={`mt-1 text-sm ${mutedClass}`}>
                  Subscribe to our newsletter for job alerts, career tips, and community updates across Canada.
                </p>
              </div>
              <div className="lg:col-span-6">
                <NewsletterForm
                  id="footer-newsletter-email"
                  buttonLabel="Subscribe"
                  buttonVariant="accent"
                  placeholder="Enter your email address"
                  successMessage="You're subscribed! Watch your inbox."
                  inputClassName="bg-white text-body border-black/10 placeholder:text-muted"
                  successClassName={isLight ? "text-primary" : "text-white"}
                />
                <p className={`mt-2.5 flex items-center gap-1.5 text-xs ${isLight ? "text-muted" : "text-white/65"}`}>
                  <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className={`${brandSpan} flex flex-col justify-between`}>
            <div>
              <Logo variant={isLight ? "dark" : "light"} />
              {brand?.blurb ? (
                <p className={`mt-4 text-sm leading-relaxed max-w-sm ${mutedClass}`}>{brand.blurb}</p>
              ) : null}
            </div>
            {social?.placement === "brand" && social.links?.length ? (
              <div className="mt-6">
                <SocialLinks links={social.links} style={social.style} isLight={isLight} />
              </div>
            ) : null}
          </div>

          {/* Navigation Columns */}
          {columns.map((column) => (
            <div key={column.heading} className={linkSpan}>
              <FooterList
                title={column.heading}
                links={column.links}
                linkClass={linkClass}
              />
            </div>
          ))}

          {/* Contact Column */}
          {contact ? (
            <div className={contactSpan}>
              <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-wider text-accent">
                {contact.heading || "Contact Us"}
              </h3>
              <ul className={`space-y-3 text-sm ${mutedClass}`}>
                {contact.phone ? (
                  <li className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <a
                      href={contact.phoneHref || `tel:${contact.phone}`}
                      className={isLight ? "hover:text-primary transition-colors" : "hover:text-white transition-colors"}
                    >
                      {contact.phone}
                    </a>
                  </li>
                ) : null}
                {contact.email ? (
                  <li className="flex items-start gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <a
                      href={contact.emailHref || `mailto:${contact.email}`}
                      className={isLight ? "hover:text-primary transition-colors" : "hover:text-white transition-colors"}
                    >
                      {contact.email}
                    </a>
                  </li>
                ) : null}
                {contact.website ? (
                  <li className="flex items-start gap-2.5">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <a
                      href={contact.websiteHref || `https://${contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isLight ? "hover:text-primary transition-colors" : "hover:text-white transition-colors"}
                    >
                      {contact.website}
                    </a>
                  </li>
                ) : null}
                {contact.addressLines?.length ? (
                  <li className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      {contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </li>
                ) : contact.address ? (
                  <li className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{contact.address}</span>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}

          {/* Social Column (if placement is 'column') */}
          {social?.placement === "column" && social.links?.length ? (
            <div className={socialColSpan}>
              <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-wider text-accent">
                Follow Us
              </h3>
              <SocialLinks links={social.links} style={social.style} isLight={isLight} />
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div
        className={
          isLight
            ? "relative border-t border-primary/15 bg-primary/5 text-body/70"
            : "border-t border-white/10 bg-black/10 text-white/70"
        }
      >
        <div className="container-page flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className={isLight ? "text-body/75" : "text-white/70"}>
            © {copyrightYear} Aboriginal Jobline. All rights reserved.
          </p>
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${isLight ? "text-body/75" : "text-white/70"}`}>
            <Link to="/privacy-policy" className={isLight ? "hover:text-primary transition-colors" : "hover:text-white transition-colors"}>
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="opacity-40">•</span>
            <Link to="/terms-of-use" className={isLight ? "hover:text-primary transition-colors" : "hover:text-white transition-colors"}>
              Terms of Use
            </Link>
            <span aria-hidden="true" className="opacity-40">•</span>
            <Link to="/accessibility" className={isLight ? "hover:text-primary transition-colors" : "hover:text-white transition-colors"}>
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
