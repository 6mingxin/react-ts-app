import { useAuth } from "context/auth-context";
import React from "react";
import { Button, Form, Input } from "antd";
import { useAsync } from "utils/use-async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync();

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch((e) => onError(e));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={"password"}>
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          style={{ width: "100%" }}
          htmlType={"submit"}
          type={"primary"}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
