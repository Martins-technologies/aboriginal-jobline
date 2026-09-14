import { ArrowRight, Briefcase, Search } from "lucide-react";
import Button from "../components/common/Button";
import PageSection from "../components/common/PageSection";
import PromoBanner from "../components/common/PromoBanner";
import SectionHeader from "../components/common/SectionHeader";
import CommunityVoicesSection from "../components/home/CommunityVoicesSection";
import EmployerTeaserBanner from "../components/home/EmployerTeaserBanner";
import HomeFeaturedJobsSection from "../components/home/HomeFeaturedJobsSection";
import HomeHero from "../components/home/HomeHero";
import HowItWorksSection from "../components/home/HowItWorksSection";
import MissionSection from "../components/home/MissionSection";
import PopularCategoriesSection from "../components/home/PopularCategoriesSection";
import WhyEmployersChooseSection from "../components/home/WhyEmployersChooseSection";
import CareerResourcesSection from "../components/sections/CareerResourcesSection";
import CTABanner from "../components/sections/CTABanner";
import PageWithFooter from "../components/layout/PageWithFooter";
import { homeResources } from "../data/homeResources";
import { homeFooterConfig } from "../data/footerConfigs";
import { images } from "../data/images";

export default function HomePage() {
  return (
    <PageWithFooter config={homeFooterConfig}>
      <HomeHero />
      <MissionSection />
      <PopularCategoriesSection />
      <HowItWorksSection />
      <EmployerTeaserBanner />
      <HomeFeaturedJobsSection />
      <PromoBanner
        eyebrow="For Employers"
        heading="Hire Aboriginal Talent. Build Stronger Teams."
        description="Post jobs, reach qualified Indigenous candidates, and build a more inclusive and diverse workplace."
        image={images.employerPromo}
        buttons={
          <>
            <Button to="/post-a-job" variant="secondary" icon={Briefcase}>
              Post a Job
            </Button>
            <Button to="/employers" variant="outline-white" icon={ArrowRight} iconPosition="right">
              Learn More
            </Button>
          </>
        }
      />
      <WhyEmployersChooseSection />
      <PageSection className="bg-topo section-pad pb-0">
        <SectionHeader
          eyebrow="Success Stories"
          title="Real Impact. Real People. Real Change."
          description="Hear from job seekers and employers building stronger communities together."
        />
      </PageSection>
      <CareerResourcesSection
        className="bg-topo pt-4 pb-6 lg:pt-5 lg:pb-7"
        eyebrow="Resources & Insights"
        title="Career Resources & Community Stories"
        description="Practical advice, inclusive hiring strategies, and inspiring stories from across Canada."
        resources={homeResources}
      />
      <CommunityVoicesSection />
      <CTABanner
        heading="Ready to Take the Next Step?"
        description="Explore job opportunities or connect with inclusive employers who value your talent."
        actions={
          <>
            <Button to="/browse-jobs" variant="outline-white" icon={Search}>
              Browse Jobs
            </Button>
            <Button to="/post-a-job" variant="white" icon={Briefcase}>
              Post a Job
            </Button>
          </>
        }
      />
    </PageWithFooter>
  );
}
