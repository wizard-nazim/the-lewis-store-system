import React from "react";
import HeroBanner from "../components/common/HeroBanner";
import LatestCollection from "../components/common/LatestCollection";
import BestSeller from "../components/common/BestSeller";
import OurPolicy from "../components/common/OurPolicy";
import NewsLetter from "../components/common/NewsLetter";
import NewsletterPopup from "../components/common/NewsLetter";
import Partners from "../components/common/Partners";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterPopup />
      <Partners />
    </div>
  );
};

export default Home;
