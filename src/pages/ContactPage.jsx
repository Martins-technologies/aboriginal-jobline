import ContactHero from "../components/contact/ContactHero";
import ContactFormSection from "../components/sections/ContactFormSection";
import MoreWaysSection from "../components/sections/MoreWaysSection";
import ContactClosingCTA from "../components/sections/ContactClosingCTA";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <MoreWaysSection />
      <ContactClosingCTA />
    </>
  );
}
