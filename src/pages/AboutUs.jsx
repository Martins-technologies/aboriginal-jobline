import AboutHero from "../components/about/AboutHero";
import AboutMissionValues from "../components/about/AboutMissionValues";
import AboutStory from "../components/about/AboutStory";
import AboutCommitment from "../components/about/AboutCommitment";
import AboutClosingCTA from "../components/about/AboutClosingCTA";
import PageWithFooter from "../components/layout/PageWithFooter";
import { homeFooterConfig } from "../data/footerConfigs";

export default function AboutUs() {
  return (
    <PageWithFooter config={homeFooterConfig}>
      <div className="about-page">
        <AboutHero />
        <AboutMissionValues />
        <AboutStory />
        <AboutCommitment />
        <AboutClosingCTA />
      </div>
    </PageWithFooter>
  );
}
