import { contactInfo, employerContact } from "./contactInfo";
import { site } from "./site";

const socialById = Object.fromEntries(site.social.map((item) => [item.id, item]));

function socialLink(id) {
  const item = socialById[id];
  return {
    platform: item.id,
    url: item.href,
    label: item.label,
  };
}

const defaultQuickLinks = [
  { to: "/", label: "Home" },
  { to: "/browse-jobs", label: "Browse Jobs" },
  { to: "/employers", label: "Employers" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
  { to: "/browse-jobs#faq", label: "FAQ" },
];

const jobSeekerLinks = [
  { to: "/browse-jobs", label: "Browse Jobs" },
  { to: "/resume-tips", label: "Resume Tips" },
  { to: "/career-resources", label: "Career Resources" },
  { to: "/community-stories", label: "Community Stories" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/contact", label: "Support & FAQ" },
];

const defaultEmployerLinks = [
  { to: "/post-a-job", label: "Post a Job" },
  { to: "/inclusive-hiring", label: "Inclusive Hiring" },
  { to: "/why-hire", label: "Why Hire Indigenous Talent" },
  { to: "/employer-resources", label: "Employer Resources" },
  { to: "/partnerships", label: "Partnerships" },
  { to: "/contact", label: "Contact Us" },
];

const employerQuickLinks = [
  { to: "/browse-jobs", label: "Browse Jobs" },
  { to: "/employers", label: "For Employers" },
  { to: "/about-us", label: "About Us" },
  { to: "/community-focus", label: "Community Focus" },
  { to: "/career-resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

const employerColumnLinks = [
  { to: "/post-a-job", label: "Post a Job" },
  { to: "/employer-dashboard", label: "Employer Dashboard" },
  { to: "/recruitment-solutions", label: "Recruitment Solutions" },
  { to: "/inclusive-hiring", label: "Diversity & Inclusion" },
  { to: "/pricing", label: "Pricing" },
  { to: "/employer-resources", label: "Employer Resources" },
];

const defaultContact = {
  heading: "Contact Us",
  phone: contactInfo.phone,
  phoneHref: contactInfo.phoneHref,
  email: contactInfo.email,
  emailHref: contactInfo.emailHref,
  addressLines: contactInfo.addressLines,
};

export const homeFooterConfig = {
  theme: "dark",
  brand: { blurb: site.tagline },
  columns: [
    { heading: "Quick Links", links: defaultQuickLinks },
    { heading: "Job Seekers", links: jobSeekerLinks },
    { heading: "Employers", links: defaultEmployerLinks },
  ],
  contact: defaultContact,
  social: {
    links: ["facebook", "instagram", "linkedin", "youtube"].map(socialLink),
    placement: "brand",
    style: "outlined",
  },
  showNewsletter: true,
  copyrightYear: 2025,
};

export const browseJobsFooterConfig = homeFooterConfig;

export const contactFooterConfig = {
  ...homeFooterConfig,
  showNewsletter: false,
};

export const employersFooterConfig = {
  theme: "dark",
  brand: { blurb: site.tagline },
  columns: [
    { heading: "Quick Links", links: employerQuickLinks },
    { heading: "For Employers", links: employerColumnLinks },
  ],
  contact: {
    heading: "Contact Us",
    phone: employerContact.phone,
    phoneHref: employerContact.phoneHref,
    email: employerContact.email,
    emailHref: employerContact.emailHref,
    addressLines: employerContact.addressLines,
  },
  social: {
    links: site.social.map((item) => ({
      platform: item.id,
      url: item.href,
      label: item.label,
    })),
    placement: "brand",
    style: "filled",
  },
  showNewsletter: false,
  copyrightYear: 2025,
};

export const postJobFooterConfig = {
  theme: "dark",
  brand: {
    blurb:
      "Aboriginal Jobline connects Indigenous talent with meaningful opportunities across Canada. Together, we build strong communities and brighter futures.",
  },
  columns: [
    {
      heading: "Quick Links",
      links: [
        { to: "/browse-jobs", label: "Browse Jobs" },
        { to: "/employers", label: "Employers" },
        { to: "/about-us", label: "About Us" },
        { to: "/contact", label: "Contact Us" },
      ],
    },
    {
      heading: "For Employers",
      links: [
        { to: "/post-a-job", label: "Post a Job" },
        { to: "/employer-resources", label: "Employer Resources" },
        { to: "/inclusive-hiring", label: "Inclusive Hiring" },
        { to: "/contact", label: "Support" },
      ],
    },
  ],
  contact: {
    heading: "Contact Us",
    phone: "1-877-Aboriginal (226-7446)",
    phoneHref: "tel:+18772267446",
    email: "support@aboriginaljobline.ca",
    emailHref: "mailto:support@aboriginaljobline.ca",
    website: "aboriginaljobline.ca",
    websiteHref: "https://aboriginaljobline.ca",
  },
  social: {
    links: ["facebook", "linkedin", "instagram"].map(socialLink),
    placement: "column",
    style: "outlined",
  },
  showNewsletter: false,
  copyrightYear: 2024,
};

export const defaultFooterConfig = homeFooterConfig;
