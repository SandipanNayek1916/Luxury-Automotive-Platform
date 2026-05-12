import { HeroSection } from "@/components/sections/hero";
import { FleetSection } from "@/components/sections/fleet";
import { BrandsShowcase } from "@/components/fleet/BrandsShowcase";
import { AppSection } from "@/components/sections/app-section";
import { FeaturesSection } from "@/components/sections/features";
import { StatsSection } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FooterSection } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <HeroSection />
      <BrandsShowcase />
      <FleetSection />
      <AppSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
