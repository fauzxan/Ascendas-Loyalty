import React from "react";
import "./styles/partnerCard.scss";
import Button from '@mui/material/Button';

function PartnerCard(props) {
	// all the cards below are sample cards

	return (
		<div className="card">
			<div className="card__body">
				<img src={props.img} className="card__image" alt="company logo" />
				<h2 className="card__title">{props.title}</h2>
				<p className="card__description">{props.desc} </p>
			</div>
			<Button variant="contained" className="card__button">Get Rewards</Button>
		</div>
	);
}

export default PartnerCard;
