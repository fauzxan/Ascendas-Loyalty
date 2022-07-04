import React from "react";
import PartnerCardSingular from "./PartnerCardSingular";
import cardDict from "./cardDict";
import "./styles/partnerCard.scss";

const PartnersCardList = () => {
  return (
    <div className="wrapper">
      {cardDict.map(function (card) {
        console.log(card);
        return <PartnerCardSingular card={card} />;
      })}
    </div>
  );
};

export default PartnersCardList;
