import React from "react";
import "./styles/SPA.css";

function NavBar() {
	return (
		<div>
			<div className="w3-light-gray w3-medium">
				<a href="/cardList" className="w3-bar-item w3-button w3-mobile">
					Back
				</a>
				<a href="/logout" className="w3-bar-item w3-button w3-hover-blue w3-center w3-mobile">
					<b>Bank of Singapore</b>
				</a>
				<a href="/user" className="w3-bar-item w3-button w3-right w3-mobile">
					Logout
				</a>
			</div>
			<div className="w3-blue-grey w3-small">
				<p href="/rewardsPage" className="w3-bar-item sub w3-button w3-mobile">
					Rewards Page
				</p>
			</div>
			<div className="w3-blue-grey w3-xlarge">
				<p href="/transferRewards" className="w3-bar-item w3-margin-left w3-margin-bottom w3-mobile">
					Transfer Rewards
				</p>
			</div>
			<div className="w3-large w3-margin-top">
				<a className="w3-bar-item w3-margin-left w3-mobile">
					<b>Available Rewards:</b>
				</a>
			</div>
		</div>
		

	);
}
export default NavBar;
