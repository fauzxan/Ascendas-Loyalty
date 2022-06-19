import React from "react";
import "./SPA.css";

function NavBar() {
  return (
    <div className="w3-bar w3-blue w3-large">
      <a href="#rooms" className="w3-bar-item w3-button w3-mobile">
        Our Companies
      </a>
      <a href="#about" className="w3-bar-item w3-button w3-mobile">
        About
      </a>
      <a href="#contact" className="w3-bar-item w3-button w3-mobile">
        Contact
      </a>
      <a href="#contact" className="w3-bar-item w3-button w3-right w3-mobile">
        Submit a claim
      </a>
    </div>
  );
}
export default NavBar;
