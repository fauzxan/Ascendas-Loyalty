import React from "react";
import "./styles/partnerCard.scss";
import Button from '@mui/material/Button';
import Popup from "./popup/RewardClickPopup";

function PartnerCard(props) {
	// all the cards below are sample cards

	return (
		<div className="card">
			<div className="card__body">
				<img src={props.img} className="card__image" alt="company logo" />
				<h2 className="card__title">{props.title}</h2>
				<p className="card__description"> You have {props.points} points </p>
			</div>
			<Popup />
		</div>
	);
}

export default PartnerCard;
