import React from 'react';
import { NavLink } from "react-router-dom";
import Style from "./Navbar.module.css";
import PopReview from "../PopReview/PopReview"

const Navbar = () => {
  return (
    <div className={Style.navbar}>
      <div className={Style.navLogo}>
        <NavLink to='/'><h1>OpenShare</h1></NavLink>
      </div>
      <div className={Style.navLinks}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        {/* <NavLink to="/post-review">Profile</NavLink> */}
        <NavLink to="/login">Login</NavLink>
        {/* <NavLink to="/registration">Registration</NavLink> */}
      </div>
      <PopReview />
    </div>
  );
};

export default Navbar;
