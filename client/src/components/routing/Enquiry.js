import React from "react";
import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import TransactionSuccess from "../popup/TransactionSuccess";
import TransactionFailure from "../popup/TransactionFailure";

const Enquiry = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log(success);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
          label="Reference code"
          name="Reference code"
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
            onOk={handleOk}
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
