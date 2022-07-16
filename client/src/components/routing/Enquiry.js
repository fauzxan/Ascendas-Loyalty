import React from "react";
import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import TransactionSuccess from "../popup/TransactionSuccess";
import TransactionFailure from "../popup/TransactionFailure";

const Enquiry = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transaction, setTransactions] = useState({});
  const transactions = { 2020080101: "0000", 2020080102: "0001" };

  const onFinish = (values) => {
    let check = values.reference;
    if (check in transactions && transactions[check] === "0000") {
      setSuccess((success) => !success);
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    // let name = JSON.parse(localStorage.getItem("user")).name;
    // console.log(name);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSuccess(false);
    setIsModalVisible(false);
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
          label="reference"
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
            {success ? <TransactionSuccess /> : <TransactionFailure />}
          </Modal>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Enquiry;
