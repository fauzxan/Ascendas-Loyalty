import React from "react";

import {Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

import About from "./components/About";
import OurCompanies from "./components/OurCompanies";
import Contact from "./components/Conctact";
import Home from "./components/Home";

function App() {


	return (
		<div>
			<div>
					<NavBar />
					<Routes>
						<Route exact path="/" element={<Home />}/>
						<Route exact path="/about" element={<About />} />
						<Route exact path="/companies" element={<OurCompanies />} />
						<Route exact path="/contact" element={<Contact />}/>
					</Routes>	
			</div>
		</div>
	);
}

export default App;
