
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import LatestEvents from "@/components/LatestEvents";
import MechanicalModel from "@/components/MechanicalModel";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="text-mea-darkblue dark:text-mea-gold">Mechanical </span>
          <span className="text-mea-gold dark:text-mea-lightblue">Engineering</span>
        </h2>
        <MechanicalModel />
      </div>
      <AboutSection />
      <StatsSection />
      <LatestEvents />
    </div>
  );
};

export default Index;
