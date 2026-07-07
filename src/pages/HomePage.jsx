import {useEffect} from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedJobs from '../components/home/FeaturedJobs';
import Mission from '../components/home/Mission';
import EmployerHighlight from '../components/home/EmployeeHightlight';
import WhyEmployers from '../components/home/WhyEmployers';
import Testimonials from '../components/home/Testominals';
import Categories from '../components/home/Categories';
import HowItWorks from '../components/home/HowitsWorks';
import Resources from '../components/home/Resources';
import CTABand from '../components/home/CTABand';
const HomePage = () => {
  useEffect(() => {
    document.title = 'JobPortal - Find Your Dream Job';
  }, []);

  return (
    <>
      <HeroSection />
      <Mission />
      <Categories />
      <HowItWorks />
     <EmployerHighlight />
     <FeaturedJobs/>
     <WhyEmployers />
     <Resources />
     <Testimonials />
     <CTABand />

    </>
  );
};

export default HomePage;