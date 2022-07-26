import React, { useContext, useState } from "react";
import "../styles/SPA.css";
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
				Home
			</button>
			<button
				id="create_accrual_button"
				onClick={caaaa}
				className="w3-bar-item w3-button w3-mobile"
			>
				Create accrual file
			</button>
			<button
				id="create_handback_button"
				onClick={createhb}
				className="w3-bar-item w3-button w3-mobile"
			>
				Create handback file
			</button>
			<div style={{ display: validateAdmin() == true ? "block" : "none" }}>
				<button id="validation" className="w3-bar-item w3-button w3-mobile">
					Insert loyalty program
				</button>
			</div>
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
