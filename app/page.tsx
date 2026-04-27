import HeroSection    from "./components/homepage_components/HeroSection";
import StatsBar       from "./components/homepage_components/StatsBar";
import RecentActivity from "./components/homepage_components/RecentActivity";
import FeaturesGrid   from "./components/homepage_components/FeaturesGrid";
import CtaSection     from "./components/homepage_components/CTASection";

// design components
import Starfield      from "./designs/Starfield";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Starfield />
      <HeroSection />
      <StatsBar />
      <RecentActivity />
      <FeaturesGrid />
      <CtaSection />
    </div>
  );
}