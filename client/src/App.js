import React, {useEffect} from "react";

import {Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

import About from "./components/About";
import OurCompanies from "./components/OurCompanies";
import Contact from "./components/Contact";
import Home from "./components/HomeList";
import BankHome from "./components/Home"

import { LoginBox } from "./components/loginPage";
import { AppContainer } from "./components/loginPage/marginer";
import { Secret } from './components/loginPage/secret'

function App() {
	const navigate = useNavigate();
	const au = localStorage.getItem('user');

	return (
		<div>
			{au && <NavBar/>}
			<Routes>
				<Route element={<Secret/>}>
				<Route exact path="/Home" element={<Home />}/>
				<Route exact path="/about" element={<About />} />
				<Route exact path="/companies" element={<OurCompanies />} />
				<Route exact path="/contact" element={<Contact />}/>
				<Route exact path="/bank-1" element={<BankHome />}/>
				</Route>
				<Route exact path="/" element={<AppContainer><LoginBox /></AppContainer>}/>
			</Routes>	
		</div>
	);
}

export default App;
