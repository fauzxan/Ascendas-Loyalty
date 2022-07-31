import React from "react";
import { Button } from "antd";
import { Carousel } from "antd";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import "./bank.css";

const contentStyle = {
  height: "200px",
  color: "#fff",
  lineHeight: "50px",
  textAlign: "center",
  background: "#b82828",
};

const user = localStorage.getItem("user");

const HomeList = (props) => {
  const navigate = useNavigate();
  var button_id = "bank-" + props.id;
  return (
    <div className="backgnd">
      <div>
        <h2 className="greeting">Welcome Back,</h2>
        <Row>
          <Col span={12}>
            <h1 className="user">{user}</h1>
            <div className="carousel">
              <Carousel autoplay speed={3500}>
                <div>
                  <h3 style={contentStyle}>
                    Emails and SMSes from DBS will not include clickable links.
                    Always go directly to our website to verify the authenticity
                    of any banking-related requests or offers.
                  </h3>
                </div>
                <div>
                  <h3 style={contentStyle}>
                    DBS will never ask you for your credit or debit card
                    details, CVV, SMS or email OTPs, or Digital Token approvals
                    to verify or unlock your account.
                  </h3>
                </div>
                <div>
                  <h3 style={contentStyle}>
                    Do not call phone numbers, click on URL links, or scan QR
                    codes in unsolicited emails, SMS, or other Messaging
                    Application messages.
                  </h3>
                </div>
                <div>
                  <h3 style={contentStyle}>
                    Never disclose your card numbers or OTPs to unverified
                    sources. Bank staff and government officials will never
                    request your card details, OTPs, or Digital Token Approvals
                    through SMS, voice calls, or unofficial websites.
                  </h3>
                </div>
              </Carousel>
            </div>
          </Col>
          <Col span={12}>
            <Button
              id={button_id}
              onClick={() => navigate("/bank-" + props.id)}
              type="danger"
              className="card_rewards__btn hover"
            >
              View Available Rewards
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomeList;
