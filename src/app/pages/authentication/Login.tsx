import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { service } from "api/services/services";
import { Context } from "@utils/context";
import { UserLoginRequest } from "api/services/Client";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await service.client.login(
        UserLoginRequest.fromJS({
          username: values.username,
          password: values.password,
        })
      );
      Context.user = {
        id: response.id,
        token: response.accessToken,
      };
      localStorage.setItem("user", Context.user);
      navigate("/");
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Username or password incorrect",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center login ">
      <div className="w-[400px] mx-auto shadow-md rounded-md px-[32px] py-[40px]">
        {!isForgotPassword ? (
          <>
            <h3 className="text-center scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
              Login
            </h3>
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password" },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  {/* <a href="">Forgot password</a> */}
                </Flex>
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          // <ForgotPassword onLogin={() => setIsForgotPassword(false)} />
          <></>
        )}
      </div>
      {contextHolder}
    </div>
  );
};

export default Login;
