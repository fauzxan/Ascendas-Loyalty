import React, { useContext } from "react";
import "./styles/clientRewards.scss";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import Stack from '@mui/material/Stack';

function HomeBankSingular(props) {
  // all the cards below are sample cards

  const navigate = useNavigate();

  return (
    <div className="card_rewards">
      <div>
        <span className="card_rewards__image">
          <img
            src={props.img}
            className="card_rewards__image"
            alt="company logo"
          />
        </span>
        <span>
          <a className="card_rewards__title">{props.title}</a>
        </span>
        <a className="card_rewards__description">{props.desc}</a>
        <span className="card_rewards__btn">
          <Button
            onClick={() => navigate("/bank-" + props.id)}
            type="primary"
            className="card_rewards__button"
          >
            View Available Rewards
          </Button>
        </span>
      </div>
    </div>
  );
}

export default HomeBankSingular;
