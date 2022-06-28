import React, { useContext } from "react";
import "./styles/SPA.css";
import { useNavigate } from "react-router-dom"

function NavBar() {
	const navigate = useNavigate();

	const logout = ()=> {
		localStorage.clear();
		navigate('/')
	}
	return (
		<div className="w3-bar w3-blue w3-large">
			<button onClick={()=>navigate("/companies")} className="w3-bar-item w3-button w3-mobile">
				Our Companies
			</button>

			<button onClick={()=>navigate("/about")} className="w3-bar-item w3-button w3-mobile">
				About
			</button>

			<button onClick={()=>navigate("/contact")} className="w3-bar-item w3-button w3-mobile">
				Contact
			</button>
			<button onClick={()=>navigate("/home")} className="w3-bar-item w3-button w3-mobile">
				Bank of Singapore
			</button>

			<button onClick={logout} className="w3-bar-item w3-button w3-right w3-mobile">
				Logout
			</button>
		</div>
	);
}
export default NavBar;
