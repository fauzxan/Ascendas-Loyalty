import React, { useContext, useState } from "react";
import "../styles/navbar2.css";
import { useNavigate } from "react-router-dom";
import { caaaa } from "../loginPage/wist";
import Axios from "axios";
import { userExport } from "../loginPage/loginForm";

const localStorage = window.localStorage;
function NavBar() {
  const navigate = useNavigate();


	async function validateAdmin() {
		const userEmail = localStorage.getItem("email");
		console.log(userEmail);
		if (userEmail === "admin_ascendas@gmail.com"){
			return true;
		}
		else {
			return false;
		}
	}

  const createhb = () => {
    Axios.get("http://localhost:5000/makehb")
      .then(() => {
        alert(
          "Handback file has been created successfully. Refresh SFTP server to see result"
        );
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=Bellefair&family=Barlow:wght@400;700&display=swap"
        />
      </head>
      <body>
        <nav class="navbar bg-dark">
          <div class="logo fs-500">Ascendas Loyalty</div>
          <ul class="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" class="hamburger">
              &#9776;
            </label>
            <div class="menu">
              <li>
                <a
                  id="BoS_button"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={() => navigate("/home")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  id="about_button"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={() => navigate("/about")}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  id="contact_button"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={() => navigate("/contact")}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  id="companies_button"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={() => navigate("/companies")}
                >
                  Our Companies
                </a>
              </li>
              <li>
                <a
                  id="enquire_button"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={() => navigate("/enquire")}
                >
                  Enquire Status
                </a>
              </li>
              <li>
                <a
                  id="create_accrual_button"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={caaaa}
                >
                  Create Accrual File
                </a>
              </li>
              <li>
                <a
                  id="create_handback_button"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={createhb}
                >
                  Create Handback File
                </a>
              </li>
              <li>
                <a
                  id="validation"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={validateAdmin}
                >
                  Insert Loyalty Program
                </a>
              </li>
              <li>
                <a
                  id="logout_button"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </div>
          </ul>
        </nav>
      </body>
    </div>
  );
}
export default NavBar;
