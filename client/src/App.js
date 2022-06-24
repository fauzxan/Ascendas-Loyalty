import React, {useState} from "react";

import {Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

import About from "./components/About";
import OurCompanies from "./components/OurCompanies";
import Contact from "./components/Contact";
import Home from "./components/Home";

import { LoginBox } from "./components/loginPage";
import styled from "styled-components";
import { loginContext } from "./components/loginPage/context";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

function App() {

	const [isLoggedIn, setLoggedIn] = useState(false);
	console.log("started")
	if (!isLoggedIn) {
		return (
			<loginContext.Provider value ={setLoggedIn}>
				<AppContainer>
					<LoginBox />
				</AppContainer>
			</loginContext.Provider>
		);
	} else {
		return (
			<div>
				<div>
					<loginContext.Provider value ={setLoggedIn}>
						{isLoggedIn && <NavBar />}
					</loginContext.Provider>
					<Routes>
						<Route exact path="/Home" element={<Home />}/>
						<Route exact path="/about" element={<About />} />
						<Route exact path="/companies" element={<OurCompanies />} />
						<Route exact path="/contact" element={<Contact />}/>
					</Routes>	
				</div>
			</div>
		);
	}
}

export default App;
