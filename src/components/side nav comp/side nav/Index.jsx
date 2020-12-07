import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  useEffect(() => {
    const sideNavLinks = document.querySelectorAll(".sideNavLink");

    sideNavLinks.forEach(sidelink => {
      sidelink.addEventListener("click", () => {
        sideNavLinks.forEach(link => link.classList.remove("active"));

        sidelink.classList.add("active");
      });
    });
  }, []);

  return (
    <div className="sideNav">
      <div className="sideNav__nav">
        <ul className="sideNav__menu">
          <li className="sideNavLink">
            <NavLink activeClassName="true" exact to="/compress">
              <span
                className="iconify"
                data-icon="vaadin:compress-square"
                data-inline="false"></span>{" "}
              compress
            </NavLink>
          </li>

          <li className="sideNavLink">
            <NavLink activeClassName="true" exact to="/rotate">
              <span
                className="iconify"
                data-icon="ic:twotone-crop-rotate"
                data-inline="false"></span>{" "}
              rotate
            </NavLink>
          </li>

          <li className="sideNavLink">
            <NavLink activeClassName="true" exact to="/scale">
              <span
                className="iconify"
                data-icon="ic:round-crop-free"
                data-inline="false"></span>
              scale
            </NavLink>
          </li>

          <li className="sideNavLink">
            <NavLink activeClassName="true" exact to="/crop">
              <span
                className="iconify"
                data-icon="bi:crop"
                data-inline="false"></span>
              crop
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
