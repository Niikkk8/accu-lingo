import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import LanguageSection from '@/components/home/LanguageSection';
import PricingSection from '@/components/home/PricingSection';
import TrustSection from '@/components/home/TrustSection';
import TeamMembers from '@/components/home/TeamMember';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <LanguageSection />
      <PricingSection />
      <TeamMembers />
      <TrustSection />
    </div>
  );
}