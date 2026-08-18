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
            rel="noreferrer"
            aria-label={item.label || item.platform}
            className={
              outlined
                ? isLight
                  ? "flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary hover:text-white"
                  : "flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-primary"
                : "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
            }
          >
            <Icon className="h-4 w-4" />
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
    ? "text-sm text-muted transition-colors hover:text-primary"
    : "text-sm text-white/75 transition-colors hover:text-white";
  const mutedClass = isLight ? "text-muted" : "text-white/75";
  const columnCount =
    1 +
    columns.length +
    (contact ? 1 : 0) +
    (social?.placement === "column" ? 1 : 0) +
    (showNewsletter ? 1 : 0);

  return (
    <footer className={`relative overflow-hidden ${isLight ? "bg-background text-body" : "bg-primary text-white"}`}>
      {isLight ? (
        <LeafBranch className="pointer-events-none absolute -bottom-6 -right-4 h-48 w-40 text-accent-light sm:h-56 sm:w-48" />
      ) : null}

      <div
        className={`container-page relative grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3 ${
          gridCols[columnCount] || "xl:grid-cols-4"
        }`}
      >
        <div className="lg:col-span-1">
          <Logo variant={isLight ? "dark" : "light"} />
          {brand?.blurb ? (
            <p className={`mt-4 text-sm leading-relaxed ${mutedClass}`}>{brand.blurb}</p>
          ) : null}
          {social?.placement === "brand" && social.links?.length ? (
            <div className="mt-5">
              <SocialLinks links={social.links} style={social.style} isLight={isLight} />
            </div>
          ) : null}
        </div>

        {columns.map((column) => (
          <FooterList
            key={column.heading}
            title={column.heading}
            links={column.links}
            linkClass={linkClass}
          />
        ))}

        {contact ? (
          <div>
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-accent">
              {contact.heading || "Contact Us"}
            </h3>
            <ul className={`space-y-3 text-sm ${mutedClass}`}>
              {contact.phone ? (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <a
                    href={contact.phoneHref || `tel:${contact.phone}`}
                    className={isLight ? "hover:text-primary" : "hover:text-white"}
                  >
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact.email ? (
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <a
                    href={contact.emailHref || `mailto:${contact.email}`}
                    className={isLight ? "hover:text-primary" : "hover:text-white"}
                  >
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.website ? (
                <li className="flex items-start gap-2">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <a
                    href={contact.websiteHref || `https://${contact.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className={isLight ? "hover:text-primary" : "hover:text-white"}
                  >
                    {contact.website}
                  </a>
                </li>
              ) : null}
              {contact.addressLines?.length ? (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              ) : contact.address ? (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{contact.address}</span>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}

        {social?.placement === "column" && social.links?.length ? (
          <div>
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-accent">
              Follow Us
            </h3>
            <SocialLinks links={social.links} style={social.style} isLight={isLight} />
          </div>
        ) : null}

        {showNewsletter && !isLight ? (
          <div>
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-accent">
              Stay Connected
            </h3>
            <p className="mb-4 text-sm text-white/75">
              Subscribe to our newsletter for job alerts, career tips, and community updates.
            </p>
            <NewsletterForm
              id="footer-newsletter-email"
              buttonLabel="Subscribe"
              placeholder="Enter your email"
              successMessage="You're subscribed. Watch your inbox."
              inputClassName="bg-white text-body"
              successClassName="text-white"
            />
            <p className="mt-3 flex items-center gap-1.5 text-xs text-white/70">
              <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              We respect your privacy.
            </p>
          </div>
        ) : null}
      </div>

      <div
        className={
          isLight
            ? "relative border-t border-dashed border-primary/30 bg-primary text-white/70"
            : "border-t border-white/15"
        }
      >
        <div className="container-page flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/70">© {copyrightYear} Aboriginal Jobline. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/70">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link to="/terms-of-use" className="hover:text-white">
              Terms of Use
            </Link>
            <span aria-hidden="true">|</span>
            <Link to="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
