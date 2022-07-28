import React, { useContext } from "react";
import "./styles/clientRewards.scss";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

function HomeBankSingular(props) {
  // all the cards below are sample cards

  const navigate = useNavigate();
  var button_id = "bank-" + props.id;

  return (
    <div className="card_rewards">
      <div>
        <a className="card_rewards__image">
          <img
            src={props.img}
            className="card_rewards__image"
            alt="company logo"
          />
        </a>
        <a>
          <a className="card_rewards__title">{props.title}</a>
        </a>
        <a className="card_rewards__description">{props.desc}</a>
        <a className="card_rewards__btn">
          <Button
            id={button_id}
            onClick={() => navigate("/bank-" + props.id)}
            type="primary"
            className="card_rewards__btn hover"
          >
            View Available Rewards
          </Button>
        </a>
      </div>
    </div>
  );
}

export default HomeBankSingular;
