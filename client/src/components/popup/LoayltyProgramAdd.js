import { Button, Modal, Checkbox, Form, Input } from "antd";
import Axios from "axios";
import React, { useState } from "react";
import { host, bh } from "../config";

const LoyaltyPopup = () => {
  console.log("Loyalty Popping up!");

  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(values.Pname);
    await Axios.post(host + "/loyaltyupload", {
      programID: values.ProgramID,
      programName: values.Pname,
      currencyName: values.curr,
      regex: values.regex,
      img: values.img,
    })
      .then(() => {
        alert("Referesh loyalty page to see");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/*
        programID: String,
        programName: String,
        currencyName: String,
        description: String,
        img: String
            */}
      <Form.Item
        label="ProgramID"
        name="ProgramID"
        rules={[
          {
            required: true,
            message: "Please input the ID!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ProgramName"
        name="Pname"
        rules={[
          {
            required: true,
            message: "Please input name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="CurrencyName"
        name="Curr"
        rules={[
          {
            required: true,
            message: "Please input currency!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Regex"
        name="regex"
        rules={[
          {
            required: true,
            message: "Input regex expression",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Image"
        name="img"
        rules={[
          {
            required: true,
            message: "Input the ImageBB url only!",
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoyaltyPopup;
