import React from "react";
import {Link} from "react-router-dom";

import "./styles/SPA.css";


function NavBar() {
	return (
			<div className="w3-bar w3-blue w3-large">
			
				<Link to="/companies" className="w3-bar-item w3-button w3-mobile">
					Our Companies
				</Link>
				<Link to="/about" className="w3-bar-item w3-button w3-mobile">
					About
				</Link>
				<Link to="/contact" className="w3-bar-item w3-button w3-mobile">Contact</Link>
				<Link to="/" className="w3-bar-item w3-button w3-hover-blue w3-center w3-mobile">
					<b>Bank of Singapore</b>
				</Link>
			</div>

	);
}
export default NavBar;
