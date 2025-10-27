import { Metadata } from "next";
import LandingPageIndex from "./LandingPageIndex";

export const metadata: Metadata = {
  title: "PRASASTI",
};

const LandingPage = () => {
  return <LandingPageIndex />;
};

export default LandingPage;
