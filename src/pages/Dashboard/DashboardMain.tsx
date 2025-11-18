import HeroSection from "./components/HeroSection";
import WhyBookSection from "./components/WhyBookSection";
import TopDestinationSection from "./components/DestinationSection";
import TravelPointSection from "./components/PointSection";
import KeyFeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/ReviewSection";

const DashboardMain = () => {
  return (
    <div className="bg-white min-h-screen w-full flex justify-center">
      <div className="w-full max-w-[1200px] px-4 md:px-8">
        <HeroSection />
        <WhyBookSection />
        <TopDestinationSection />
        <TravelPointSection />
        <KeyFeaturesSection />
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default DashboardMain;
