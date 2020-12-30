import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  const [isToggleNav, setIsToggleNav] = useState(false);

  useEffect(() => {
    window.innerWidth < 600 && setIsToggleNav(false);
  }, []);

  return (
    <div className={`${isToggleNav ? `sideNav open` : "sideNav"}`}>
      <div
        className="sideNav__toggle"
        onClick={() => setIsToggleNav(!isToggleNav)}>
        <i className={`fas fa-${isToggleNav ? "times" : "bars"}`}></i>
      </div>

      <div className="sideNav__menu">
        <NavLink activeClassName="true" exact to="/compress">
          <span
            className="iconify"
            data-icon="vaadin:compress-square"
            data-inline="false"></span>
          <span className="right">compress</span>
        </NavLink>

        <NavLink activeClassName="true" exact to="/rotate">
          <span
            className="iconify"
            data-icon="ic:twotone-crop-rotate"
            data-inline="false"></span>
          <span className="right">rotate</span>
        </NavLink>

        <NavLink activeClassName="true" exact to="/crop">
          <span
            className="iconify"
            data-icon="bi:crop"
            data-inline="false"></span>
          <span className="right">crop</span>
        </NavLink>

        <NavLink activeClassName="true" exact to="/gif">
          <span
            className="iconify"
            data-icon="ri:file-gif-line"
            data-inline="false"></span>
          <span className="right">Gif</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideNav;
