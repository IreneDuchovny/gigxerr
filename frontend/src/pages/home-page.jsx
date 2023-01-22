import React from "react";
import { PopularServices } from "../cmps/popular-services.jsx";
import { SellingAd } from "../cmps/selling-ad.jsx";
import { MarketCategories } from "../cmps/market-categories.jsx";

export function HomePage() {
  return (
    <section className="home-page full">
      {/* <PopularServices /> */}
      <SellingAd />
      <MarketCategories />
    </section>
  );
}
