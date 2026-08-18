import TestimonialCard from "../employers/TestimonialCard";
import PageSection from "../common/PageSection";
import SectionHeader from "../common/SectionHeader";
import { homeTestimonials } from "../../data/homeTestimonials";

export default function CommunityVoicesSection() {
  return (
    <PageSection className="bg-topo section-pad">
      <SectionHeader
        eyebrow="Community Voices"
        title="Voices from the Community"
        description="Real stories from job seekers and employers making a difference together."
      />
      <div className="mt-4 grid gap-x-4 gap-y-8 pt-4 md:grid-cols-3">
        {homeTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} layout="featured" />
        ))}
      </div>
    </PageSection>
  );
}
