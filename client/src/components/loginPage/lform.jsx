import React, { useState } from "react";
import {
  Form,
  Input,
  Space,
} from "antd";

export function Lform(props) {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 90,
      },
      sm: {
        span: 90,
      },
    },
  };

  return (
    <Form name="login" onFinish={onFinish} style={{zIndex:0, position: "relative"}}>
      <Space
        direction="vertical"
        size={0}
        style={{
          display: "flex",
        }}
      >
        <Form.Item style={{zIndex:0, position:"relative"}}
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input placeholder="Email" style={{zIndex:0, position:"relative"}}/>
        </Form.Item>

        <Form.Item name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>
      </Space>
    </Form>
  );
}
