import React, { useRef } from "react";
import "./styles/partnerCard.scss";
import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import "antd/dist/antd.min.css";
import Popup from "./popup/RewardClickPopup";
import Axios from "axios";
import { host, bh } from "./config";
import { Spin } from "antd";
import sendOnSubmit from "./email/sendOnSubmit";

const PartnerCardSingular = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amt, setAmt] = useState(0);
  const [cc, setCc] = useState("");
  const [e, setE] = useState(false);
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
    Axios.get(bh + "/getUser")
      .then((response) => {
        const user = localStorage.getItem("email");
        const result = response.data;
        for (let i = 0; i < result.length; i++) {
          if (result[i].email === user) {
            setPoints(result[i].points);
            setTier(result[i].tier);
          }
        }
        console.log(tier);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    setE(true);
    var v = false;
    let lpro = props.card.programName;
    let memid = values.membership_number;
    await Axios.post(host + "/validate", {
      l: lpro,
      m: memid,
    })
      .then((response) => {
        v = true;
      })
      .catch((e) => {
        if (e.response.status === 403) {
          alert("Invalid membership ID");
        }
      });
    if (!v) {
      setE(false);
      return;
    }
    let date = new Date();
    let today = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    let fullname = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    let partnercode = "DBS";
    let amt = values.amount;
    await Axios.post(bh + "/createtransaction", {
      memberid: memid,
      fullname: fullname,
      amount: amt,
      date: today,
      partnercode: partnercode,
      loyaltyprogramme: lpro,
      email: email,
    })
      .then((response) => {
        setCc(response.data.referenceNumber);
        handleOk();
        setSuccess(true);
        setAmt(amt);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("Insufficient points");
        }
        console.warn(err);
      });
    setE(false);
    sendOnSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const counter = useRef(0);
  const [loading, setLoading] = useState(true);
  const imageLoaded = () => {
    counter.current += 1;
    setLoading(false);
  };

  return (
    <div className="card" onLoad={executeScroll}>
      <div className="card__body">
        <div style={{ display: loading ? "block" : "none" }}>
          <Spin />
        </div>
        <div style={{ display: loading ? "none" : "block" }}>
          <img
            src={props.card.img}
            className="card__image"
            alt="company logo"
            onLoad={imageLoaded}
          />
        </div>
        <h2 className="card__title">{props.card.programName}</h2>
        <p className="card__description">{props.card.description} </p>
      </div>
      <button
        id={"claim_rewards_" + props.card.programName}
        type="primary"
        onClick={showModal}
        className="card__btn hover hover__btn"
      >
        Claim rewards
      </button>

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
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount (Min is 1)"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount of points to transfer",
              },
            ]}
          >
            <Input
              type="number"
              name="test_name"
              min="1"
              oninput="validity.valid||(value='');"
            />
          </Form.Item>

          <p className="ptfield">You currently have {points} points</p>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              id={"claim_submit_" + props.card.programName}
              type="primary"
              loading={e}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {success && (
        <Popup success={setSuccess} amt={amt * tier} cc={cc} setcc={setCc} />
      )}
    </div>
  );
};
export default PartnerCardSingular;
