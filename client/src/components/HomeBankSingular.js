import React,  { useContext } from "react";
import "./styles/clientRewards.scss";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { loginContext } from "./loginPage/context";

function HomeBankCard(props) {
	// all the cards below are sample cards

	const navigate = useNavigate();
	const setLoggedIn = useContext(loginContext);

	const logout = ()=> {
		setLoggedIn(false);
		navigate("/");
	}

	return (	
		<div className="card_rewards">
			<div>
				<span className="card_rewards__image">
					<img src={props.img} className="card_rewards__image" alt="company logo" />
				</span>
				<span>
					<a className="card_rewards__title">
						{props.title}
					</a>
				</span>
					<a className="card_rewards__description">
						{props.desc}
					</a>
				<span className="card_rewards__btn">
					<button onClick={()=>navigate("/bank-" + props.id)} variant="contained" className="card_rewards__button">
						View Available Rewards
					</button>
				</span>
			</div>
		</div>
	);
}

export default HomeBankCard;
