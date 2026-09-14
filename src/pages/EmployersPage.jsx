import EmployerHero from "../components/employers/EmployerHero";
import WhyChooseEmployerSection from "../components/employers/WhyChooseEmployerSection";
import EmployerSolutionsSection from "../components/employers/EmployerSolutionsSection";
import EmployerFAQSection from "../components/employers/EmployerFAQSection";
import EmployerClosingCTA from "../components/employers/EmployerClosingCTA";
import PageWithFooter from "../components/layout/PageWithFooter";
import { employersFooterConfig } from "../data/footerConfigs";

export default function EmployersPage() {
  return (
    <PageWithFooter config={employersFooterConfig}>
      <EmployerHero />
      <WhyChooseEmployerSection />
      <EmployerSolutionsSection />
      <EmployerFAQSection />
      <EmployerClosingCTA />
    </PageWithFooter>
  );
}
