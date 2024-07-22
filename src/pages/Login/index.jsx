import {
  Button,
  Checkbox,
  Form,
  Input,
  Col,
  Row,
  Divider,
  Typography,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const { Title } = Typography;
import "./Login.css";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ padding: "0 20px" }} // Añade padding para pequeños márgenes en pantallas pequeñas
      >
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <div>
            <Title>Login</Title>
            <p>Hi, Welcome back 👋</p>
            <Divider />
          </div>
          <Form
            name="Login"
            layout="vertical"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              maxWidth: "600px",
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
              <div className="login-form-register">
                Not registered yet? <a href="">Create an account</a>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export { Login };
