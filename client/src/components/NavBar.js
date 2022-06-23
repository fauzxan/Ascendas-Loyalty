import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./styles/SPA.css";
import About from "./About";
import OurCompanies from "./OurCompanies";
import Contact from "./Conctact";

function NavBar() {
	return (
		<div className="w3-bar w3-blue w3-large">
			<a href="/companies" className="w3-bar-item w3-button w3-mobile">
				Our Companies
			</a>
			<a className="w3-bar-item w3-button w3-mobile">About</a>
			<a className="w3-bar-item w3-button w3-mobile">Contact</a>
			<a className="w3-bar-item w3-button w3-hover-blue w3-center w3-mobile">
				<b>Bank of Singapore</b>
			</a>
			<a className="w3-bar-item w3-button w3-right w3-mobile">User</a>
		</div>
	);
}
export default NavBar;
