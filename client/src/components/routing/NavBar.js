import React, { useState } from "react";
import "../styles/navbar2.css";
import { useNavigate } from "react-router-dom";
import { caaaa, seed } from "../loginPage/wist";
import Axios from "axios";
import LoyaltyPopup from "../popup/LoayltyProgramAdd";
import { Modal } from "antd";
import dbs from "../images/dbs.jpg";
import sendMultiple from "../email/sendDaily";
import { host } from "../config";

const localStorage = window.localStorage;
function NavBar() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(false);
  const [loyaltyPopup, setLoyaltyPopup] = useState(false);
  async function validateAdmin() {
    const userEmail = localStorage.getItem("email");
    console.log(userEmail);
    if (userEmail == "admin_ascendas@gmail.com") {
      setAdmin(true);
    }
  }

  async function createLoyalty() {
    setLoyaltyPopup(true);
    console.log(loyaltyPopup);
  }

  const createhb = async () => {
    await Axios.get(host + "/makehb")
      .then(() => {
        alert(
          "Handback file has been created successfully. Refresh SFTP server to see result"
        );
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  const sendEmails = () => {
    Axios.get(host + "/getintermediate")
      .then((result) => {
        console.log(result.data);
        const values = result.data;
        sendMultiple(values);
      })
      .catch((err) => {
        console.log("error in retrieving intermediate handback\n", err);
      });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div onLoad={validateAdmin}>
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
        <nav className="navbar bg-dark w3-black">
          <ul className="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" className="hamburger">
              &#9776;
            </label>
            <div className="menu">
              <img src={dbs} />
              <li>
                <a
                  id="BoS_button"
                  className="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={() => navigate("/home")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  id="about_button"
                  className="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={() => navigate("/about")}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  id="enquire_button"
                  className="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={() => navigate("/enquire")}
                >
                  Enquire Status
                </a>
              </li>
              <li>
                <a
                  id="resetpts"
                  class="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={seed}
                >
                  Spend money
                </a>
              </li>
              <li style={{ display: admin == true ? "block" : "none" }}>
                <a
                  id="create_accrual_button"
                  className="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={caaaa}
                >
                  Create Accrual File
                </a>
              </li>
              <li style={{ display: admin == true ? "block" : "none" }}>
                <a
                  id="create_handback_button"
                  className="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={createhb}
                >
                  Create Handback File
                </a>
              </li>
              <li style={{ display: admin == true ? "block" : "none" }}>
                <a
                  id="validation"
                  className="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={createLoyalty}
                >
                  Insert Loyalty Program
                </a>
              </li>
              <li style={{ display: admin == true ? "block" : "none" }}>
                <a
                  id="validation"
                  className="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={sendEmails}
                >
                  Send Daily Emails
                </a>
              </li>
              <li>
                <a
                  id="logout_button"
                  className="ff-sans-cond uppercase text-white letter-spacing-2 fs-300"
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </div>
          </ul>
        </nav>
        <Modal
          visible={loyaltyPopup}
          onCancel={() => {
            setLoyaltyPopup(false);
          }}
          onOk={() => {
            setLoyaltyPopup(false);
          }}
        >
          <LoyaltyPopup />
        </Modal>
      </body>
    </div>
  );
}
export default NavBar;
