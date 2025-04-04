
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import LatestEvents from "@/components/LatestEvents";
import ChatbotInterface from "@/components/ChatbotInterface";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <StatsSection />
      <LatestEvents />
      <ChatbotInterface />
    </div>
  );
};

export default Index;
