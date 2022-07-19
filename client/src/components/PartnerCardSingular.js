import React from "react";
import "./styles/partnerCard.scss";
import { useState } from "react";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import "antd/dist/antd.min.css";
import Popup from "./popup/RewardClickPopup";
import Axios from "axios";

const PartnerCardSingular = (props) => {
  //console.log(props);
  // all the cards below are sample cards

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amt, setAmt] = useState(0);
  const [cc, setCc] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    let date = new Date();

    let today = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    let fullname = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    let partnercode = "Daddy's bank";
    let memid = values.membership_number;
    let amt = values.amount;
    let lpro = props.card.title;
    Axios.post("https://loyalty-backend.herokuapp.com/submitcreditreq", {
      memberid: memid,
      fullname: fullname,
      amount: amt,
      date: today,
      partnercode: partnercode,
      loyaltyprogramme: lpro,
      email: email,
    })
      .then((response) => {
        setCc(response.data.refcode);
      })
      .catch((err) => {
        console.warn(err);
      });
    handleOk();
    setSuccess(true);
    setAmt(amt);
    Axios.post("http://localhost:5000/createhandback", {
      date: today,
      amount: amt,
      referencenumber: Number("0x".concat(cc)),
      outcomecode: "0000",
    })
      .then((response) => {
        console.log("Data sent to the buffer handback file");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        title={props.card.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Membership number"
            name="membership_number"
            rules={[
              {
                required: true,
                message: "Please input membership ID",
              },
              {
                pattern: new RegExp(
                  /^(\d{9}|\d{10}|\d{12}|\d{16}|[0-9]{9}[A-Z]{1})$/
                ),
                message: "Please input valid membership ID",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount of points to transfer",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {success && (
        <Popup success={setSuccess} amt={amt} cc={cc} setcc={setCc} />
      )}
    </div>
  );
};
export default PartnerCardSingular;
