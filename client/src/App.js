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

	const onLoggedIn = ()=>{
		setLoggedIn(true);
	}
	if (!isLoggedIn) {
		return (
			<AppContainer>
				<LoginBox onLoggedIn={onLoggedIn}/>
			</AppContainer>
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
