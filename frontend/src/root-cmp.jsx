import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { GigDetails } from './pages/gig-details'
import { GigPayment } from './pages/gig-payment.jsx'
import { GigEdit } from './pages/gig-edit'
import { LoginSignup } from './cmps/login-signup'
import { HiddenScreen } from './cmps/hidden-screen'
import { UserDropDownModal } from './cmps/user-dropdown-modal'

export function RootCmp() {
  const [openOrders, setOpenOrders] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [openJoin, setOpenJoin] = useState(false)
  const [openUserDropDown, setOpenUserDropDown] = useState(false)

  return (
    <div>
      {/* <AppHeader ref={headerRef}/> */}
      <HiddenScreen setOpenOrders={setOpenOrders} 
      setOpenLogin={setOpenLogin} 
      setOpenJoin={setOpenJoin} />
      <AppHeader openOrders={openOrders} setOpenOrders={setOpenOrders} 
        openLogin={openLogin} 
        setOpenLogin={setOpenLogin} 
        openJoin={openJoin} 
        setOpenJoin={setOpenJoin}
        openUserDropDown={openUserDropDown} 
        setOpenUserDropDown={setOpenUserDropDown}
        />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            exact={true}
            element={route.component}
            path={route.path}
          />
        ))}
        <Route path="user/:id" element={<UserDetails />} />
        <Route path="gig/:id"element={<GigDetails/>}/>
        <Route path="payments/:id" element={<GigPayment />} />
        <Route path="/gig/edit/:gigId" element={<GigEdit />} />
        <Route path="/gig/edit" element={<GigEdit />} />
        <Route path="/user/loginsignup" element={<LoginSignup />} />
      </Routes>
      <UserDropDownModal openUserDropDown={openUserDropDown} setOpenUserDropDown={setOpenUserDropDown} />
      <AppFooter />
      </div>
    
  );
}
