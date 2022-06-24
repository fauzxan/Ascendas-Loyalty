import React, {useState} from "react";

import {Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

import About from "./components/About";
import OurCompanies from "./components/OurCompanies";
import Contact from "./components/Conctact";
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
`;

function App() {

	const [isLoggedIn, setLoggedIn] = useState(false);

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
					{isLoggedIn && <NavBar />}
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