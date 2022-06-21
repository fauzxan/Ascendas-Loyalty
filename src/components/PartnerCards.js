import React from "react";
import SIA from "./SIA.png";
import Star from "./Star.png";
import Sands from "./sands.png";

function PartnerCard() {
	console.log(SIA);
	// all the cards below are sample cards 
	return (
		<div className="w3-row-padding w3-padding-16 w3-animate-fading">
			<div className="w3-card-custom w3-third w3-margin-bottom">
				<img
					src={Star}
					alt="Norway"
					width={"100%"}
					height={"100%"}
					className="custom-card-dimensions"
				/>
				<div className="w3-container w3-white">
					<h3>Star Alliance</h3>
					<p></p>
					<p className="w3-large">
						<i className="fa fa-bath"></i> <i className="fa fa-phone"></i>
						<i className="fa fa-wifi"></i>
					</p>
					<button className="w3-button w3-block w3-black w3-margin-bottom">
						Get Rewards!
					</button>
				</div>
			</div>
			<div className="w3-card-custom w3-third w3-margin-bottom">
				<img
					src={Sands}
					alt="Norway"
					width={"100%"}
					className="custom-card-dimensions"
				/>
				<div className="w3-container w3-white">
					<h3>Sands group</h3>
					<p></p>
					<p className="w3-large">
						<i className="fa fa-bath"></i> <i className="fa fa-phone"></i>
						<i className="fa fa-wifi"></i> <i className="fa fa-tv"></i>
					</p>
					<button className="w3-button w3-block w3-black w3-margin-bottom">
						Get Rewards!
					</button>
				</div>
			</div>
			<div className="w3-card-custom w3-third w3-margin-bottom">
				<img
					src={SIA}
					alt="Norway"
					width={"100%"}
					className="custom-card-dimensions"
				/>
				<div className="w3-container w3-white">
					<h3>Kris Flyer</h3>
					<p></p>
					<p className="w3-large">
						<i className="fa fa-bath"></i> <i className="fa fa-phone"></i>
						<i className="fa fa-wifi"></i> <i className="fa fa-tv"></i>
						<i className="fa fa-glass"></i> <i className="fa fa-cutlery"></i>
					</p>
					<button className="w3-button w3-block w3-black w3-margin-bottom">
						Get Rewards!
					</button>
				</div>
			</div>
		</div>
	);
}

export default PartnerCard;
