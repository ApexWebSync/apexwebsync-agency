import Hero from '@/components/Hero';
import SeoAuditTool from '@/components/SeoAuditTool';
import Services from '@/components/Services';
import RoiCalculator from '@/components/RoiCalculator';
import CaseStudies from '@/components/CaseStudies';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <SeoAuditTool />
      <Services />
      <RoiCalculator />
      <CaseStudies />
      <Pricing />
      <Testimonials />
      <ContactSection />
    </div>
  );
}
