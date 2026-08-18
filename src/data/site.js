import { contactInfo } from "./contactInfo";

export const site = {
  name: "Aboriginal Jobline",
  phone: contactInfo.phone,
  phoneHref: contactInfo.phoneHref,
  email: contactInfo.email,
  addressLines: contactInfo.addressLines,
  tagline:
    "Connecting Indigenous talent with inclusive employers across Canada through meaningful work, community, and opportunity.",
  hero: {
    image: "/img1.webp",
    imageAlt: "Indigenous professionals collaborating in a modern office",
  },
  social: [
    { id: "facebook", label: "Facebook", href: "https://facebook.com" },
    { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com" },
    { id: "youtube", label: "YouTube", href: "https://youtube.com" },
  ],
};
