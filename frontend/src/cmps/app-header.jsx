import {
  Link,
  NavLink,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { login, logout, signup } from "../store/user.actions.js";
import { GigFilter } from "./gig-filter.jsx";
import { PopupMenu } from "./popup-menu";
import { PopupOrderList } from "./popup-order-list.jsx";
import { GigOrderList } from "./gig-order-list.jsx";
import { setFilter } from "../store/gig.actions.js";
// import { gigService } from '../services/gig.service.local'
import { gigService } from "../services/gig.service";
import { ReactComponent as WhiteLogo } from "../assets/img/lazyerr-logo-white.svg";
import { ReactComponent as BlackLogo } from "../assets/img/lazyerr-logo-black.svg";
import { LoginSignup } from "./login-signup";

export function AppHeader({
  openOrders,
  setOpenOrders,
  openLogin,
  setOpenLogin,
  openJoin,
  setOpenJoin,
  openUserDropDown,
  setOpenUserDropDown,
}) {
  const navigate = useNavigate();
  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterByToEdit, setFilterByToEdit] = useState(
    gigService.getDefaultFilter()
  );
  const user = useSelector((storeState) => storeState.userModule.user);
  const [headerStyle, setHeaderStyle] = useState(
    location.pathname === "/" ? "fix" : "sticky"
  );
  // const [openOrders, setOpenOrders] = useState(false)
  // const [openSign, setOpenSign] = useState(false);
  const [logo, setLogo] = useState(
    location.pathname === "/" ? <WhiteLogo /> : <BlackLogo />
  );

  // useEffect(() => {
  //   switchHeaderStyle(window.pageYOffset);
  // }, [location]);

  useEffect(() => {
    window.onscroll = function (e) {
      switchHeaderStyle(window.pageYOffset);
    };
  }, []);

  useEffect(() => {
    window.onscroll = function (e) {
      switchHeaderStyle(window.pageYOffset);
    };
  }, [location.pathname]);
  // useEffect(() => {
  //   console.log("class", headerStyle);
  // }, [headerStyle]);
  useEffect(() => {
    window.onscroll = function (e) {
      switchHeaderStyle(window.pageYOffset);
    };
  }, [location]);
  useEffect(() => {
    const queryFilterBy = gigService.getFilterFromSearchParams(searchParams);
    onSetFilter(queryFilterBy);
  }, []);

  function switchHeaderStyle(pageYOffset) {
    console.log("location.pathname", location.pathname);
    console.log("pageYOffset", pageYOffset);
    if (location.pathname !== "/") {
      setHeaderStyle("sticky ");
      setLogo(<BlackLogo />);
    }
    if (location.pathname === "/" && pageYOffset === 0) {
      setHeaderStyle("fix ");
      setLogo(<WhiteLogo />);
    }
    if (location.pathname === "/" && pageYOffset > 0) {
      setHeaderStyle("fix2 ");
      setLogo(<BlackLogo />);
    }
    if (location.pathname === "/" && pageYOffset > 125) {
      setHeaderStyle("fix3 ");
      setLogo(<BlackLogo />);
    }
  }

  // async function onLogin(credentials) {
  //     try {
  //         const user = await login(credentials)
  //         showSuccessMsg(`Welcome ${user.fullname}`)
  //     } catch (err) {
  //         showErrorMsg('Cannot login')
  //     }
  // }
  // async function onSignup(credentials) {
  //     try {
  //         const user = await signup(credentials)
  //         showSuccessMsg(`${user.fullname} ,Welcome to Lazyerr!`)
  //     } catch (err) {
  //         showErrorMsg('Cannot signup')
  //     }
  // }

  function handleSubmit(ev) {
    ev.preventDefault();
    setSearchParams(filterByToEdit);
    onSetFilter(filterByToEdit);
  }

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, [field]: value };
    });
  }

  function onSetFilter(filterBy) {
    // console.log("filterByfom header", filterBy);
    setSearchParams(filterBy);
    setFilter(filterBy);
    // navigate(`/gig?title=${filterBy.title}`);
  }

  function toggleMenu() {
    document.body.classList.toggle("menu-open");
  }

  return (
    <header className={`app-header main-container full sticky ${headerStyle}`}>
      <div className="main-screen" onClick={toggleMenu}></div>
      <div className="flex align-center top-nav">
        <section className="top-nav-logo-search flex align-center">
          <Link className="header-logo" to={`/`}>
            {/* <svg width='89' height='27' viewBox='0 0 89 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <g className='svg-logo' fill='#404145'>
                            <path d='m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z'></path>
                        </g>
                        <g fill='#1dbf73'>
                            <path d='m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z'></path>
                        </g>
                    </svg> */}
            {logo}
          </Link>
          <form className=" flex  align-center search-container" type="submit" onSubmit={handleSubmit}>
            <label htmlFor="gigTitle"></label>
            
            <input
              className="search-box"
              type="text"
              id="gigTitle"
              name="title"
              placeholder="What service are you looking for today?"
              value={filterByToEdit.title}
              onChange={handleChange}
            />
            
            <div className="search-icon-box" onClick={() => { onSetFilter(filterByToEdit) }}  >
              <span className="material-symbols-outlined search-icon">
                search
              </span>
            </div>
            
          </form>
        </section>
        <button className="menu-toggle-btn" onClick={toggleMenu}>
          ☰
        </button>
        <section className="top-nav-actions flex">
          <p
            onClick={() => {
              toggleMenu()
              navigate("/gig");
              setHeaderStyle("sticky ");
              setLogo(<BlackLogo />);
            }}
            className="nav-hover-clr"
          >
            Explore
          </p>
          {user && (
            <section className="header-action-icons">
              <a href="">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/layout-server/bell.78d6546.svg"
                  className="notifications-drawer-bell-trigger"
                  alt="Notifications"
                ></img>
              </a>
              <a href="">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/layout-server/letter.07c989b.svg"
                  className="notifications-drawer-letter-trigger"
                  alt="Messages"
                ></img>
              </a>
              <Link to="/wishlist">
                {" "}
                <a href="">
                  <span className="XQskgrQ icon-button" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.325 2.00937C12.5188 0.490623 9.72813 0.718748 8 2.47812C6.27188 0.718748 3.48125 0.487498 1.675 2.00937C-0.674996 3.9875 -0.331246 7.2125 1.34375 8.92187L6.825 14.5062C7.1375 14.825 7.55625 15.0031 8 15.0031C8.44688 15.0031 8.8625 14.8281 9.175 14.5094L14.6563 8.925C16.3281 7.21562 16.6781 3.99062 14.325 2.00937ZM13.5875 7.86875L8.10625 13.4531C8.03125 13.5281 7.96875 13.5281 7.89375 13.4531L2.4125 7.86875C1.27188 6.70625 1.04063 4.50625 2.64063 3.15937C3.85625 2.1375 5.73125 2.29062 6.90625 3.4875L8 4.60312L9.09375 3.4875C10.275 2.28437 12.15 2.1375 13.3594 3.15625C14.9563 4.50312 14.7188 6.71562 13.5875 7.86875Z"></path>
                    </svg>
                  </span>
                </a>
              </Link>
            </section>
          )}
          <div className="user-actions flex space-between">
            {user && (
              <div className="user-visible-icons">
                <a
                  className="orders-link"
                  // onClick={(ev) => {
                  //   ev.stopPropagation();
                  //   setOpenOrders(!openOrders);
                  // }}
                  onClick={() => {
                    toggleMenu()
                    navigate("/orders")
                  }
                  }
                >
                  <span>Orders</span>
                  <div className="pop-menu-orders-area">
                    {openOrders && (
                      <PopupMenu type="orders">
                        <PopupOrderList />
                      </PopupMenu>
                    )}
                  </div>
                </a>
              </div>
            )}

            {user && (
              <div className="user-info flex align-center">
                <Link className="flex align-center">
                  {/* {user.imgUrl && (
                    <div className="nav-user-img-container">
                      <img src={user.imgUrl} />
                      <div className="user-modal flex">
                        <div className="modal-tip"></div><a href={`user/${user._id}`} className="light">Profile</a>
                        <a href="{`user/${user._id}`}" className="">Dashboard</a><a onClick={onLogout}>Logout</a></div>
                    </div>
                  )} */}
                  <div
                    className="nav-user-img-container"
                    onClick={() => {
                      setOpenUserDropDown(!openUserDropDown);
                    }}
                  >
                    <img src={user.imgUrl} />
                  </div>
                </Link>
                {/* <button className="logout-btn" onClick={onLogout}>Logout</button> */}
              </div>
            )}
            {!user && (
              <section className="user-info">
                {/* <Link to={'/user/loginsignup'}> */}
                <a
                  className="orders-link"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setOpenLogin(!openLogin);
                  }}
                >
                  <span>Sign In</span>
                </a>
                <div className="pop-menu-orders-area login-area-popup">
                  {openLogin && (
                    <PopupMenu
                      onClick={(ev) => {
                        ev.stopPropagation();
                      }}
                      type="login"
                    >
                      <LoginSignup
                        setHeaderStyle={setHeaderStyle}
                        setLogo={setLogo}
                        BlackLogo={BlackLogo}
                        isLogin={true}
                      />
                    </PopupMenu>
                  )}
                </div>
                {/* </Link> */}
                {/* <Link to={'/user/loginsignup'}> */}
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setOpenJoin(!openJoin);
                  }}
                  className="join-btn"
                >
                  Join
                </button>{" "}
                {/* </Link> */}
                {openJoin && (
                  <PopupMenu
                    onClick={(ev) => {
                      ev.stopPropagation();
                    }}
                    type="login"
                  >
                    <LoginSignup
                      setHeaderStyle={setHeaderStyle}
                      BlackLogo={BlackLogo}
                      isJoin={true}
                    />
                  </PopupMenu>
                )}
              </section>
            )}
          </div>
        </section>
      </div>
      <hr className="full" />
      <nav className="main-nav">
        <ul className="clean list flex space-between jusitfy-center ">
          <li>
            <a onClick={() => onSetFilter({ tags: 'graphics-design' })} >Graphics & Design</a>
          </li>
          <li>
            <a onClick={() => onSetFilter({ tags: 'digital-marketing' })} >Digital Marketing</a>
          </li>
          <li>
            <a onClick={() => onSetFilter({ tags: 'writing-translation' })} >Writing & Translation</a>
          </li>
          <li>
            <a onClick={() => onSetFilter({ tags: 'video-animation' })} >Video & Animation</a>
          </li>
          <li>
            <a onClick={() => onSetFilter({ tags: 'music-audio' })} >Music & Audio</a>
          </li>
          <li>
            <a onClick={() => onSetFilter({ tags: 'programming-tech' })} >Programming & Tech</a>
          </li>
          <li>
            <a onClick={() => onSetFilter({ tags: 'business' })} >Business</a>
          </li>
          <li>
            <a onClick={() => onSetFilter({ tags: 'lifestyle' })} >Lifestyle</a>
          </li>
          <li>
            <a onClick={() => onSetFilter({ tags: 'trending' })} >Trending</a>
          </li>
        </ul>
      </nav>
      <hr className="full " />
    </header>
  );
}
