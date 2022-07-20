import { Result } from "antd";
import React from "react";

const TransactionSuccess = (props) => (
  <Result
    status="success"
    title={`Your transaction: ${props.code} was successful`}
  />
);

export default TransactionSuccess;
