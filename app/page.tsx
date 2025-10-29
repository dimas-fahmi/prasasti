import { Metadata } from "next";
import LandingHeroSection from "./sections/HeroSection";

export const metadata: Metadata = {
  title: "Your Thoughts, Etched In Time | Prasasti",
};

const LandingPage = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <LandingHeroSection />
    </div>
  );
};

export default LandingPage;
