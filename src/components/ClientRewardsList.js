import React from "react";
import ClientRewardsCard from "./ClientRewardsSingular";
import cardDict from "./cardDict";
import "./styles/clientRewards.scss";

class ClientRewardsList extends React.Component {
	render() {
		return (
			<div className="wrapper_rewards">
				{cardDict.map(function (card) {
                    console.log(card);
					return <ClientRewardsCard {...card} />;
				})}
			</div>
		);
	}
}

export default ClientRewardsList;
