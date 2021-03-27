import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavData } from "./NavData";
import { IconContext } from "react-icons";

import "./Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const toggleNav = () => setClicked(!clicked);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={toggleNav} />
            </Link>
          </div>
          <nav className={clicked ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={toggleNav}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {NavData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
