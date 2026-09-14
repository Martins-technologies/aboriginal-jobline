import AccentHeading from "../common/AccentHeading";
import DottedArcs from "../common/DottedArcs";
import PageSection from "../common/PageSection";
import SectionWaveDivider from "../common/SectionWaveDivider";
import ContactForm from "../contact/ContactForm";
import IconInfoCard from "../common/IconInfoCard";
import OfficeHoursRow from "../contact/OfficeHoursRow";
import { contactInfo } from "../../data/contactInfo";

const infoCards = [
  {
    id: "email",
    title: "Email Us",
    value: contactInfo.email,
    href: contactInfo.emailHref,
    icon: "mail",
    tone: "peach",
  },
  {
    id: "phone",
    title: "Call Us",
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
    icon: "phone",
    tone: "teal",
  },
  {
    id: "visit",
    title: "Visit Us",
    lines: contactInfo.addressLines,
    icon: "map-pin",
    tone: "gold",
  },
];

export default function ContactFormSection() {
  return (
    <PageSection id="contact-form" className="bg-topo scroll-mt-20" contained={false}>
      <DottedArcs />
      <div className="container-page relative section-pad">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <AccentHeading className="text-3xl sm:text-4xl lg:text-[2.5rem]">
              Send Us a Message
            </AccentHeading>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Have a question or need support? Contact Aboriginal Jobline for employment
              assistance, employer inquiries, or community partnerships across Canada. We’re
              here to help.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-4">
            {infoCards.map((item) => (
              <IconInfoCard key={item.id} item={item} />
            ))}
            <div className="border-t border-black/10 pt-5">
              <OfficeHoursRow />
            </div>
          </div>
        </div>
      </div>
      <SectionWaveDivider />
    </PageSection>
  );
}
