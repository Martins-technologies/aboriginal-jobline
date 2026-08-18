import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import NewsletterForm from "../forms/NewsletterForm";
import { site } from "../../data/site";
import { contactInfo } from "../../data/contactInfo";
import { getIcon } from "../../utils/icons";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/browse-jobs", label: "Browse Jobs" },
  { to: "/employers", label: "Employers" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

const jobSeekerLinks = [
  { to: "/browse-jobs", label: "Search Jobs" },
  { to: "/career-resources", label: "Career Resources" },
  { to: "/browse-jobs#browse-categories", label: "Job Alerts" },
  { to: "/success-stories", label: "Success Stories" },
];

const employerLinks = [
  { to: "/employers", label: "Post a Job" },
  { to: "/employers", label: "Find Talent" },
  { to: "/employer-resources", label: "Employer Services" },
  { to: "/employer-resources", label: "Hiring Resources" },
];

function FooterList({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-accent">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm text-white/75 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ showNewsletter = false }) {
  return (
    <footer className="bg-primary text-white">
      <div
        className={`container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-3 ${
          showNewsletter ? "xl:grid-cols-6" : "xl:grid-cols-5"
        }`}
      >
        <div className="lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 text-sm leading-relaxed text-white/75">{site.tagline}</p>
          <div className="mt-5 flex gap-2">
            {site.social.map((item) => {
              const Icon = getIcon(item.id);
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <FooterList title="Quick Links" links={quickLinks} />
        <FooterList title="Job Seekers" links={jobSeekerLinks} />
        <FooterList title="Employers" links={employerLinks} />

        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-accent">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={contactInfo.phoneHref} className="hover:text-white">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={contactInfo.emailHref} className="hover:text-white">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {contactInfo.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>

        {showNewsletter ? (
          <div>
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-accent">
              Stay Connected
            </h3>
            <p className="mb-4 text-sm text-white/75">
              Subscribe for new roles, career resources, and community stories.
            </p>
            <NewsletterForm
              id="footer-newsletter-email"
              buttonLabel="Subscribe"
              placeholder="Enter your email"
              successMessage="You're subscribed. Watch your inbox."
              inputClassName="bg-white text-body"
              successClassName="text-white"
            />
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Aboriginal Jobline</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
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
