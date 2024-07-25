import { Row, Col, Divider, Typography, message } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { LoginForm } from "../../components/LoginForm";
const { Title } = Typography;

const Login = () => {
  const { tokenLoading, tokenData, handleLogin, loginLoading } = useAuth();

  if (tokenLoading) return "Loading...";

  const onFinish = async (values) => {
    try {
      await handleLogin(values);
      message.success("Login successful!");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      {!tokenData && (
        <Row justify="center" align="middle" style={{ padding: "0 20px" }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <div>
              <Title>Login</Title>
              <p>Hi, Welcome back 👋</p>
              <Divider />
            </div>
            <LoginForm onFinish={onFinish} isLoading={loginLoading} />
          </Col>
        </Row>
      )}
    </>
  );
};

export { Login };
