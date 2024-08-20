import { Layout, theme, Space, Typography } from "antd";
// import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const { Link } = Typography;
const { Header } = Layout;
const LayoutHeader = () => {
  const { handleLogOut } = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onLogOut = async () => {
    try {
      await handleLogOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "end",
        alignContent: "end",
        alignItems: "end",
      }}
    >
      <Space align="end" style={{ marginRight: "30px" }}>
        <Link onClick={() => onLogOut()}>Logout</Link>
      </Space>
    </Header>
  );
};

export { LayoutHeader };
