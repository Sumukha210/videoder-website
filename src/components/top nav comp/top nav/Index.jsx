import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

const removeActivelink = () => {
  document.querySelectorAll(".sideNavLink").forEach(sideNavLink => {
    sideNavLink.classList.remove("active");
  });
};

const TopNavBar = () => {
  const history = useHistory();

  useEffect(() => {
    const topNavLinks = document.querySelectorAll(".topNavLink");

    topNavLinks.forEach(topNavLink => {
      topNavLink.addEventListener("click", () => {
        removeActivelink();
      });
    });
  }, []);

  const handleLogoClick = () => {
    history.push("/");
    removeActivelink();
  };

  return (
    <header className="topNav">
      <div className="topNav__container">
        <nav className="topNav__nav">
          <div className="topNav__logo" onClick={handleLogoClick}>
            <img src="/images/logo.png" alt="" />
          </div>
          <ul className="topNav__menu">
            <li className="topNavLink">
              <NavLink exact to="/" activeClassName="true">
                <i className="fas fa-home"></i>
              </NavLink>
            </li>
            <li className="topNavLink">
              <NavLink exact to="/about" activeClassName="true">
                <i className="fas fa-address-card"></i>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default TopNavBar;
