import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles/clientRewards.scss";

const HomeList = (props) => {
  const navigate = useNavigate();
  var button_id = "bank-" + props.id;
  return (
    <>
      <Button
        id={button_id}
        onClick={() => navigate("/bank-" + props.id)}
        type="primary"
        className="card_rewards__btn hover"
      >
        View Available Rewards
      </Button>
    </>
  );
};

export default HomeList;
