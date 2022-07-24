import React from "react";
import HomeBankSingular from "./HomeBankSingular";
import bankDict from "./bankDict";
import "./styles/clientRewards.scss";

class HomeList extends React.Component {

  

  render() {
    return (
      <div className="wrapper_rewards">
        {bankDict.map(function (card) {
          console.log(card);
          return <HomeBankSingular {...card} />;
        })}
      </div>
    );
  }
}

export default HomeList;
