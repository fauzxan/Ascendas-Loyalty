import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import TransactionSuccess from "../popup/TransactionSuccess";
import TransactionFailure from "../popup/TransactionFailure";
import Axios from "axios";

const Enquiry = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("Pending");
  const [transactions, setTransactions] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:5000/getUser", {})
      .then((response) => {
        const user = localStorage.getItem("user");
        const result = response.data;
        for (let i = 0; i < result.length; i++) {
          if (result[i].name === user) {
            setTransactions(result[i].transactions);
            break;
          }
        }
      })
      .catch((err) => {
        console.warn(err.response);
      });
  }, []);

  const onFinish = (values) => {
    let check = values.reference;
    console.log(transactions);
    if (check in transactions) {
      switch (transactions[check]) {
        case "0000":
          setSuccess((success) => !success);
          break;
        case "0001":
          setMessage("Member not found");
          break;
        case "0002":
          setMessage("Member name mismatch");
          break;
        case "0003":
          setMessage("Member account closed");
          break;
        case "0004":
          setMessage("Member account suspended");
          break;
        case "0005":
          setMessage("Member ineligible for accrual");
          break;
        case "0099":
          setMessage(
            "Unable to process, please contact support for more information"
          );
          break;
      }
    } else {
      setMessage("You did not make this transaction");
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSuccess(false);
    setIsModalVisible(false);
    setMessage("Pending");
  };

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Enquire your transaction status here
      </h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Reference"
          name="reference"
          rules={[
            {
              required: true,
              message: "Please input your reference code!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={showModal}>
            Submit
          </Button>
          <Modal
            title="Transaction Outcome"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            {success ? (
              <TransactionSuccess />
            ) : (
              <TransactionFailure message={message} />
            )}
          </Modal>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Enquiry;
