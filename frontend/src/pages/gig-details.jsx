// import {ReactComponent} from 'react'

import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addOrder } from "../store/order.actions.js";

import { gigService } from "../services/gig.service.js";
// import { gigService } from "../services/gig.service.local.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

import { ReviewPreview } from "../cmps/review-preview.jsx";
import { DetailsNav } from "../cmps/details-nav.jsx";
import { StarsRating } from "../cmps/stars-rating.jsx";
import { PaymentTabs } from "../cmps/payment-tabs.jsx";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../store/user.actions";

import { ReactComponent as Lightning } from "../assets/img/details/lightning.svg";
import { ReactComponent as Arrow } from "../assets/img/details/arrow.svg";
import { Loading } from "../cmps/loading";

export function GigDetails() {
  const [gig, setGig] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const wishlist = useSelector(
    (storeState) => storeState.userModule.user?.wishlist || []
  );

  useEffect(() => {
    loadGig();
    getWishlist();
    window.scrollTo(0, 0);
  }, [id]);

  // useEffect(() => {
  //   document.querySelector(".app-header").classList.remove("sticky");
  //   return () => {
  //     document.querySelector(".app-header").classList.add("sticky");
  //   };
  // }, []);

  async function addGigToWishlist() {
    try {
      await addToWishlist(gig);
      showSuccessMsg("Gig added to wishlist");
    } catch (err) {
      showErrorMsg("Cannot add gig to wishlist");
      console.error("err", err);
    }
  }

  async function loadGig() {
    try {
      const loadGig = await gigService.getById(id);
      setGig(loadGig);
    } catch (err) {
      console.log("GigDetails: err in loadGig", err);
      showErrorMsg("Gig not found");
      navigate("/gig");
    }
  }

  async function onAddOrder(order, plan) {
    try {
      const newOrder = await addOrder(order, plan);
      console.log("newOrder", newOrder);
      return newOrder;
    } catch (err) {
      console.log("GigDetails: err in onAddOrder", err);

      showErrorMsg("Order not added - please login");
    }
  }
  function handleClickReviews(ev) {
    ev.preventDefault();
    const section = document.querySelector('#details-reviews');
    section.scrollIntoView({ behavior: 'smooth' });
  }

  if (!gig)
    return (
      <div className="loading-spinner flex">
        <Loading />
      </div>
    );
  return (
    <div className="main-content main-container">
      <div className="overview-nav top-nav sticky full main-container">
        <DetailsNav
          gig={gig}
          wishlist={wishlist || []}
          addGigToWishlist={addGigToWishlist}
          removeGigFromWishlist={removeFromWishlist}
        />
        <div className="hr-top-details sticky full">
          <hr />
        </div>
      </div>

      {/* <div className="main-details-container"> */}
      {/* <div className="hr-details-nav ">
                </div> */}
      <section className="gig-details-page flex">
        <div className="gig-details">
          <div id="overview" className="gig-overview">
            <div className="gig-details-breadcrumbs arrow-svg">
              {gig.tags.map((tag) => (
                <Link to={`/gig?&tags=${tag}`}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)} <Arrow />{" "}
                </Link>
              ))}{" "}
            </div>
            <div className="gig-title"> {gig.title}</div>
            <div className="seller-overview reviewer-img flex">
              <img src={gig.owner.imgUrl} />
              <Link to={`/user/${gig.owner._id}`}>
                <span className="seller-name fs14"> {gig.owner.fullname}</span>
              </Link>
              | <StarsRating rate={gig.owner.rate} />
            </div>
          </div>
          <div
            className="gig-gallery full
          "
          >
            <Carousel showIndicators={false}>
              {gig.imgUrls.map((imgUrl) => {
                return (
                  <div className="gig-carousel-card">
                    <img src={imgUrl} />
                    {/* //todo: to add review to Carousel */}
                    {/* <p className="legend">to add review</p> */}
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div id="reviews" className="reviews-snippet ">
            <div className="head-mini-reviews flex space-between">
              {/* <header> */}
              <div className="seller-rev-head">
                What people loved about this seller
              </div>
              <div className="mini-review-btn"><a href="#details-reviews" className="details-reviews" onClick={handleClickReviews}> See all reviews</a></div>
              {/* </header> */}
            </div>
            <div className="reviews-carusel">
              <Carousel showIndicators={false} showThumbs={false}>
                {gig.reviews?.map((review) => {
                  // console.log("review", review);
                  return (
                    <div id="details-reviews" className="reviews-container-cr">
                      {/* <img src={require(`../assets/img/details/demo-details2.jpg`)} /> */}
                      {/* <p className="review-preview">{review.txt}</p> */}
                      <ReviewPreview review={review} />
                    </div>
                  );
                })}
              </Carousel>
              {/* reviews-carousel-wrapper" */}
            </div>
          </div>
          <div id="description" className="gig-description">
            <header>
              <h2 className="section-title">About This Gig</h2>
            </header>

            <div className="description-wrapper">
              {/* check if description-wrapper is needed */}
              <div className="description-content">
                {gig.description}
                {/* check for only SM screen buttons className="collapse-button" */}
              </div>
              {/* check if metadata is needed here */}
            </div>
          </div>
          <h2 id="aboutSeller" className="about-the-seller">
            <span>About The Seller</span></h2>
          <div className="about-seller-content">
            <p className="about-seller-details">{gig.aboutSeller}</p>
          </div>

          <div className="profile-card">
            <div className="seller-card">
              <div className="profile-info flex">
                <div className="profile-img-container">
                  <img className="profile-img" src={gig.owner.imgUrl} />
                </div>
                <div className="about-user-info">
                  <div className="about-user-name">{gig.owner.fullname}</div>
                  <div className="about-seller-rate">
                    <StarsRating rate={gig.owner.rate} />
                  </div>
                  <div className="contact-me-btn">Contact Me</div>
                </div>
              </div>
              <div className="full-main-reviews flex column">
                <div className="main-reviews-container">
                  <div className="main-reviews-header">Reviews</div>
                  {gig.reviews?.map((review) => {
                    // console.log("review", review);
                    return (
                      <div className="reviews-container">
                        {/* <div className="hr-top-details ">
                                                    <hr /></div> */}
                        {/* <img src={require(`../assets/img/details/demo-details2.jpg`)} /> */}
                        {/* <p className="review-preview">{review.txt}</p> */}
                        <ReviewPreview
                          review={review}
                          detailsReviews={true}
                          className="review-main-details"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="stats-desc">{/* check if needed */}</div>
            </div>
          </div>
          {/* stopped at compare packages */}
        </div>

        <div className="gig-main-payment flex column">
          <div className="payment-area">
            <div className="basic"></div>
          </div>
          <div className="payment-area-wrapper">
            <div className="main-package-container  ">
              {/* <div className="package-container flex column"> */}
              <PaymentTabs gig={gig} onAddOrder={onAddOrder} />
            </div>

            <div className="contact-seller flex">
              <div className="contact-seller-wrapper">
                <div className="contact-seller-btn"> Contact Seller</div>
              </div>
            </div>
            <div className="highly-responsive">
              <div className="responsive-wrapper flex">
                <span className="lightning">
                  <Lightning />
                </span>
                <div>
                  <div className="responsive-header">
                    <b>Highly responsive!</b>
                  </div>
                  <span className="responsive-text">
                    Known for exceptionally quick replies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    // </div>
  );
}
