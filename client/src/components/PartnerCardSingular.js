import React from "react";
import "./styles/partnerCard.scss";
import { useState } from "react";
import { Button, Modal } from "antd";
import "antd/dist/antd.css";

const PartnerCardSingular = (props) => {
  console.log(props);
  // all the cards below are sample cards

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="card">
      <div className="card__body">
        <img src={props.card.img} className="card__image" alt="company logo" />
        <h2 className="card__title">{props.card.title}</h2>
        <p className="card__description">{props.card.desc} </p>
      </div>
      <Button type="primary" onClick={showModal}>
        Claim rewards
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default PartnerCardSingular;
