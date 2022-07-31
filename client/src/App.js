import React, { useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/routing/NavBar";

import About from "./components/routing/About";
import OurCompanies from "./components/routing/OurCompanies";
import Contact from "./components/routing/Contact";
import HomeList from "./components/HomeList";
import PartnersCardList from "./components/PartnersCardList";
import Enquiry from "./components/routing/Enquiry";

import { LoginBox } from "./components/loginPage";
import { AppContainer } from "./components/loginPage/marginer";
import { Secret } from "./components/loginPage/secret";

function App() {
  const navigate = useNavigate();
  const au = localStorage.getItem("user");

  return (
    <div>
      {au && <NavBar />}
      <Routes>
        <Route element={<Secret />}>
          <Route exact path="/home" element={<HomeList id={1} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/companies" element={<OurCompanies />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/enquire" element={<Enquiry />} />
          <Route exact path="/bank-1" element={<PartnersCardList />} />
        </Route>
        <Route
          exact
          path="/"
          element={
            <AppContainer>
              <LoginBox />
            </AppContainer>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
