import React, { useContext } from "react";
import "../styles/SPA.css";
import { useNavigate } from "react-router-dom";
import { caaaa } from "../loginPage/wist";
import Axios from "axios";

function NavBar() {
  const navigate = useNavigate();

  async function validateAdmin(){
    await Axios.get("http://localhost:5000/getUser").then(res => {
      console.log(res.data)
      
    })
    alert("You do not have admin rights for this!")
  }

  const createhb = () =>{
    Axios.get("http://localhost:5000/makehb").then( () => {
      alert("Handback file has been created successfully. Refresh SFTP server to see result")
    }).catch((err) => {
      console.warn(err);
    })
  } 

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="w3-bar w3-black w3-large">
      <button
        id="companies_button"
        onClick={() => navigate("/companies")}
        className="w3-bar-item w3-button w3-mobile"
      >
        Our Companies
      </button>

      <button
        id="about_button"
        onClick={() => navigate("/about")}
        className="w3-bar-item w3-button w3-mobile"
      >
        About
      </button>

      <button
        id="contact_button"
        onClick={() => navigate("/contact")}
        className="w3-bar-item w3-button w3-mobile"
      >
        Contact
      </button>

      <button
        id="enquire_button"
        onClick={() => navigate("/enquire")}
        className="w3-bar-item w3-button w3-mobile"
      >
        Enquire Status
      </button>

      <button
        id="BoS_button"
        onClick={() => navigate("/home")}
        className="w3-bar-item w3-button w3-mobile"
      >
        Bank of Singapore
      </button>
      <button id="create_accrual_button" onClick={caaaa} className="w3-bar-item w3-button w3-mobile">
        Create accrual file
      </button>
      <button id="create_handback_button" onClick={createhb} className="w3-bar-item w3-button w3-mobile">
        Create handback file
      </button>
      <button id="validation" onClick={validateAdmin} className="w3-bar-item w3-button w3-mobile">
        Insert loyalty program
      </button>

      <button
        id="logout_button"
        onClick={logout}
        className="w3-bar-item w3-button w3-right w3-mobile"
      >
        Logout
      </button>
    </div>
  );
}
export default NavBar;
