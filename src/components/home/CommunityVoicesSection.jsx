import TestimonialCard from "../employers/TestimonialCard";
import PageSection from "../common/PageSection";
import SectionHeader from "../common/SectionHeader";
import { homeTestimonials } from "../../data/homeTestimonials";

export default function CommunityVoicesSection() {
  return (
    <PageSection className="bg-topo pt-5 pb-6 lg:pt-6 lg:pb-7">
      <SectionHeader
        eyebrow="Community Voices"
        title="Voices from the Community"
        description="Real stories from job seekers and employers making a difference together."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {homeTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} layout="featured" />
        ))}
      </div>
    </PageSection>
  );
}
