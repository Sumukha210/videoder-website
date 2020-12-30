import React from "react";
import { NavLink, useHistory } from "react-router-dom";

const TopNavBar = () => {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push("/");
  };

  return (
    <header className="topNav">
      <div className="topNav__container">
        <div className="topNav__logo" onClick={handleLogoClick}>
          <img src="/images/logo.png" alt="" />
        </div>
        <ul className="topNav__menu">
          <li className="topNavLink">
            <NavLink exact to="/" activeClassName="true">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </NavLink>
          </li>

          <li className="topNavLink">
            <NavLink exact to="/about" activeClassName="true">
              <i className="fas fa-address-card"></i>
              <span>About</span>
            </NavLink>
          </li>

          <li className="topNavLink">
            <NavLink exact to="/info" activeClassName="true">
              <i className="fas fa-info-circle"></i>
              <span>Info</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default TopNavBar;
