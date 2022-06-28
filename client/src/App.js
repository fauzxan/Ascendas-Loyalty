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
import styled from "styled-components";
import { Secret } from './components/loginPage/secret'

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
	const navigate = useNavigate();
	const au = localStorage.getItem('user');

	return (
		<div>
			{au && <NavBar/>}
			<Routes forceRefresh={true}>
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
