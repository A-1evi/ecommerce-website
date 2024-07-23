import React from "react";

import Slider from "./Slider";

import ShopByCategory from "./ShopByCategory";

import PromoSection from "./PromotionalSection";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Slider />
      <PromoSection />
      <ShopByCategory />
    </div>
  );
};

export default Home;
