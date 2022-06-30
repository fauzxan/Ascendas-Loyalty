import React from "react";
import PartnerCard from "./PartnerCardSingular";
import cardDict from "./cardDict";
import "./styles/partnerCard.scss";

class CardList extends React.Component {
	render() {
		return (
			<div className="wrapper">
				{cardDict.map(function (card) {
                    console.log(card);
					return <PartnerCard {...card} />;
				})}
			</div>
		);
	}
}
// card list will help render partner card where
export default CardList;
