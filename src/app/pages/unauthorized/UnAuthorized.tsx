import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const UnAuthorized = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="UnAuthorized"
      subTitle="You need to login to use product"
      extra={
        <Button type="primary" onClick={() => navigate("/login")}>
          Back to Login
        </Button>
      }
    />
  );
};

export default UnAuthorized;
