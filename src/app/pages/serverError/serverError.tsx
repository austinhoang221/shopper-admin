import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const ServerError = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, server has down."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default ServerError;
