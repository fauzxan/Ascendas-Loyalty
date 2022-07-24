import React from "react";
import PartnerCardSingular from "./PartnerCardSingular";
import partnerCardDict from "./cardDict";
import "./styles/partnerCard.scss";

const PartnersCardList = () => {
  return (
    <div className="wrapper">
      {partnerCardDict.map(function (card) {
        return <PartnerCardSingular card={card} />;
      })}
    </div>
  );
};

export default PartnersCardList;
