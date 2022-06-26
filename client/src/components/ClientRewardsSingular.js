import React from "react";
import "./styles/clientRewards.scss";
import Button from '@mui/material/Button';

function ClientRewardsCard(props) {
	// all the cards below are sample cards

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
						{props.points}
					</a>
				<span className="card_rewards__button">
					<Button variant="contained" className="card_rewards__button">Transfer Points</Button>
				</span>
			</div>
		</div>
	);
}

export default ClientRewardsCard;
