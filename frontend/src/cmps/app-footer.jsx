import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

import { removeFromCart, checkout } from "../store/gig.actions";
import { UserMsg } from "./user-msg.jsx";
import { ReactComponent as BlackLogo } from "../assets/img/lazyerr-logo-black.svg";
import { Categories } from "./categories.jsx";

export function AppFooter() {
  const [isCartShown, setIsCartShown] = useState(false);
  const cart = useSelector((storeState) => storeState.gigModule.cart);
  const count = useSelector((storeState) => storeState.userModule.count);
  const cartTotal = cart.reduce((acc, gig) => acc + gig.price, 0);

  // async function onCheckout() {
  //   try {
  //     const score = await checkout(cartTotal);
  //     showSuccessMsg(`Charged, your new score: ${score.toLocaleString()}`);
  //   } catch (err) {
  //     showErrorMsg("Cannot checkout");
  //   }
  // }

  return (
    <footer className="main-container full app-footer">
      <hr className="full" />
      <Categories />
      <hr />
      <section className="footer-container align-center flex">
        <div className="title">
          <Link to="/">
          <span className="logo-footer">
            <BlackLogo />
          </span></Link>
          <p className="copy-rights">© Gigxerr International Ltd. 2023</p>
        </div>
        <div className="social-links">
          <div>
           
            <a>
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                xmlns="http://www.w3.org/2000/svg"
                className=""
              >
                <g fill="#62646a">
                  <path d="M20 1.875C19.25 2.25 18.5 2.375 17.625 2.5C18.5 2 19.125 1.25 19.375 0.25C18.625 0.75 17.75 1 16.75 1.25C16 0.5 14.875 0 13.75 0C11.625 0 9.75 1.875 9.75 4.125C9.75 4.5 9.75 4.75 9.875 5C6.5 4.875 3.375 3.25 1.375 0.75C1 1.375 0.875 2 0.875 2.875C0.875 4.25 1.625 5.5 2.75 6.25C2.125 6.25 1.5 6 0.875 5.75C0.875 7.75 2.25 9.375 4.125 9.75C3.75 9.875 3.375 9.875 3 9.875C2.75 9.875 2.5 9.875 2.25 9.75C2.75 11.375 4.25 12.625 6.125 12.625C4.75 13.75 3 14.375 1 14.375C0.625 14.375 0.375 14.375 0 14.375C1.875 15.5 4 16.25 6.25 16.25C13.75 16.25 17.875 10 17.875 4.625C17.875 4.5 17.875 4.25 17.875 4.125C18.75 3.5 19.5 2.75 20 1.875Z"></path>
                </g>
              </svg>
            </a>
          </div>
          <div>
            <a>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className=""
              >
                <g fill="#62646a">
                  <path d="M20 10.0022C20.0004 8.09104 19.4532 6.2198 18.4231 4.61003C17.393 3.00026 15.9232 1.71938 14.1877 0.919062C12.4522 0.118741 10.5237 -0.167503 8.63053 0.0942223C6.73739 0.355948 4.9589 1.15468 3.50564 2.39585C2.05237 3.63701 0.985206 5.26863 0.430495 7.0975C-0.124217 8.92636 -0.143239 10.8759 0.37568 12.7152C0.894599 14.5546 1.92973 16.2067 3.35849 17.476C4.78726 18.7453 6.54983 19.5786 8.4375 19.8772V12.8922H5.89875V10.0022H8.4375V7.79843C8.38284 7.28399 8.44199 6.76382 8.61078 6.2748C8.77957 5.78577 9.05386 5.33986 9.4142 4.96866C9.77455 4.59746 10.2121 4.31007 10.6959 4.12684C11.1797 3.94362 11.6979 3.86905 12.2137 3.90843C12.9638 3.91828 13.7121 3.98346 14.4525 4.10343V6.56718H13.1925C12.9779 6.53911 12.7597 6.55967 12.554 6.62733C12.3484 6.69498 12.1607 6.80801 12.0046 6.95804C11.8486 7.10807 11.7283 7.29127 11.6526 7.49408C11.577 7.69689 11.5479 7.91411 11.5675 8.12968V10.0047H14.3412L13.8975 12.8947H11.5625V19.8834C13.9153 19.5112 16.058 18.3114 17.6048 16.4999C19.1516 14.6884 20.001 12.3842 20 10.0022Z"></path>
                </g>
              </svg>
            </a>
          </div>
          <div>
            <a>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#62646a">
                  <path d="M19.125 0H0.875C0.375 0 0 0.375 0 0.875V19.25C0 19.625 0.375 20 0.875 20H19.25C19.75 20 20.125 19.625 20.125 19.125V0.875C20 0.375 19.625 0 19.125 0ZM5.875 17H3V7.5H6V17H5.875ZM4.5 6.25C3.5 6.25 2.75 5.375 2.75 4.5C2.75 3.5 3.5 2.75 4.5 2.75C5.5 2.75 6.25 3.5 6.25 4.5C6.125 5.375 5.375 6.25 4.5 6.25ZM17 17H14V12.375C14 11.25 14 9.875 12.5 9.875C11 9.875 10.75 11.125 10.75 12.375V17.125H7.75V7.5H10.625V8.75C11 8 12 7.25 13.375 7.25C16.375 7.25 16.875 9.25 16.875 11.75V17H17Z"></path>
                </g>
              </svg>
            </a>
          </div>
          <a>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#62646a">
                <path d="M10 0C4.5 0 0 4.5 0 10C0 14.25 2.625 17.875 6.375 19.25C6.25 18.5 6.25 17.25 6.375 16.375C6.5 15.625 7.5 11.375 7.5 11.375C7.5 11.375 7.25 10.875 7.25 10C7.25 8.625 8.125 7.5 9.125 7.5C10 7.5 10.375 8.125 10.375 8.875C10.375 9.75 9.875 11 9.5 12.25C9.25 13.25 10 14 11 14C12.75 14 14.125 12.125 14.125 9.375C14.125 7 12.375 5.25 10 5.25C7.125 5.25 5.5 7.375 5.5 9.625C5.5 10.5 5.875 11.375 6.25 11.875C6.25 12.125 6.25 12.25 6.25 12.375C6.125 12.75 6 13.375 6 13.5C6 13.625 5.875 13.75 5.625 13.625C4.375 13 3.625 11.25 3.625 9.75C3.625 6.625 5.875 3.75 10.25 3.75C13.75 3.75 16.375 6.25 16.375 9.5C16.375 13 14.25 15.75 11.125 15.75C10.125 15.75 9.125 15.25 8.875 14.625C8.875 14.625 8.375 16.5 8.25 17C8 17.875 7.375 19 7 19.625C8 19.875 9 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0Z"></path>
              </g>
            </svg>
          </a>
          <div>
            <a>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#62646a">
                  <path d="M15.1814 6.06504C15.8442 6.06504 16.3814 5.52778 16.3814 4.86504C16.3814 4.2023 15.8442 3.66504 15.1814 3.66504C14.5187 3.66504 13.9814 4.2023 13.9814 4.86504C13.9814 5.52778 14.5187 6.06504 15.1814 6.06504Z"></path>
                  <path d="M10 15C7.2425 15 5 12.7575 5 10C5 7.2425 7.2425 5 10 5C12.7575 5 15 7.2425 15 10C15 12.7575 12.7575 15 10 15ZM10 7.5C8.62125 7.5 7.5 8.62125 7.5 10C7.5 11.3787 8.62125 12.5 10 12.5C11.3787 12.5 12.5 11.3787 12.5 10C12.5 8.62125 11.3787 7.5 10 7.5Z"></path>
                  <path d="M15 20H5C2.43 20 0 17.57 0 15V5C0 2.43 2.43 0 5 0H15C17.57 0 20 2.43 20 5V15C20 17.57 17.57 20 15 20ZM5 2.5C3.83125 2.5 2.5 3.83125 2.5 5V15C2.5 16.1912 3.80875 17.5 5 17.5H15C16.1688 17.5 17.5 16.1688 17.5 15V5C17.5 3.83125 16.1688 2.5 15 2.5H5Z"></path>
                </g>
              </svg>
            </a>
          </div>
          {/* <div>
            <a href="">
              <span className="material-symbols-outlined">language</span>
            </a>
          </div>
          <div>
            <a href="">
              <span className="material-symbols-outlined">accessibility</span>
            </a>
          </div> */}
        </div>

        <UserMsg />
      </section>
    </footer>
  );
}
