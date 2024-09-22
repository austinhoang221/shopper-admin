import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const UnSupported = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="UnSupported"
      subTitle="Sorry, the page you visited unsupported yet."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default UnSupported;
