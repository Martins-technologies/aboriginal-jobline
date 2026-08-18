import ContactHero from "../components/contact/ContactHero";
import ContactFormSection from "../components/sections/ContactFormSection";
import MoreWaysSection from "../components/sections/MoreWaysSection";
import ContactClosingCTA from "../components/sections/ContactClosingCTA";
import PageWithFooter from "../components/layout/PageWithFooter";
import { contactFooterConfig } from "../data/footerConfigs";

export default function ContactPage() {
  return (
    <PageWithFooter config={contactFooterConfig}>
      <ContactHero />
      <ContactFormSection />
      <MoreWaysSection />
      <ContactClosingCTA />
    </PageWithFooter>
  );
}
