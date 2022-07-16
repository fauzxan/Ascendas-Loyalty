import { Result } from "antd";
import React from "react";

const TransactionFailure = () => (
  <Result
    status="error"
    title="There are some problems with your transaction"
  />
);

export default TransactionFailure;
