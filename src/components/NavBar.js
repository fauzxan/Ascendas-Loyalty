import React from "react";
import "./styles/SPA.css";

function NavBar() {
	return (
		<div className="w3-bar w3-blue w3-large">
			<a href="/companies" className="w3-bar-item w3-button w3-mobile">
				Our Companies
			</a>
			<a href="#about" className="w3-bar-item w3-button w3-mobile">
				About
			</a>
			<a href="/contact" className="w3-bar-item w3-button w3-mobile">
				Contact
			</a>
			<a href="/logout" className="w3-bar-item w3-button w3-hover-blue w3-center w3-mobile">
				<b>Bank of Singapore</b>
			</a>
			<a href="/logout" className="w3-bar-item w3-button w3-right w3-mobile">
				Logout
			</a>
		</div>
	);
}
export default NavBar;
