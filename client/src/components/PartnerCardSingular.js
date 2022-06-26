import React from "react";
import "./styles/partnerCard.scss";
import Button from "@mui/material/Button";
import Modal from "./Modal";
import { useState } from "react";

function PartnerCard(props) {
  // all the cards below are sample cards

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="card">
      <div className="card__body">
        <img src={props.img} className="card__image" alt="company logo" />
        <h2 className="card__title">{props.title}</h2>
        <p className="card__description">{props.desc} </p>
      </div>
      <Button
        variant="contained"
        className="card__button"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Get Rewards
      </Button>
      {openModal && <Modal closeModal={setOpenModal} />}
    </div>
  );
}

export default PartnerCard;
