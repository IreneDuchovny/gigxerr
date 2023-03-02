import React from "react";
import { PopularServices } from "../cmps/popular-services.jsx";
import { SellingAd } from "../cmps/selling-ad.jsx";
import { MarketCategories } from "../cmps/market-categories.jsx";
import { AppHero } from "../cmps/app-hero";
import { useEffect } from "react";

export function HomePage() {

  useEffect (() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <section className="home-page full">
      <AppHero />
      <section className="trustedBy  main-container">
        <ul className=" trusted-list flex clean-list  ">
          <h3>Trusted by:</h3>
          <li className="trustedByImg">
            <img src={require("../assets/img/trustedBy/facebook.png")} alt="" />
          </li>
          <li className="trustedByImg">
            <img src={require("../assets/img/trustedBy/google.png")} alt="" />
          </li>
          <li className="trustedByImg">
            <img src={require("../assets/img/trustedBy/netflix.png")} alt="" />
          </li>
          <li className="trustedByImg">
            <img src={require("../assets/img/trustedBy/p&g.png")} alt="" />
          </li>
          <li className="trustedByImg">
            <img src={require("../assets/img/trustedBy/paypal.png")} alt="" />
          </li>
        </ul>
      </section>
      <PopularServices />
      <SellingAd />
      <MarketCategories />
    </section>
  );
}
