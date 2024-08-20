import { Layout, theme } from "antd";
import { LayoutSidebar } from "../../components/DashboardLayout/LayoutSidebar";
import { LayoutHeader } from "../../components/DashboardLayout/LayoutHeader";
import { LayoutFooter } from "../../components/DashboardLayout/LayoutFooter";
import { useAuth } from "../../hooks/useAuth";

const { Content } = Layout;

const Dashboard = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <LayoutSidebar />
      <Layout
        style={{
          overflow: "auto",
        }}
      >
        <LayoutHeader />
        <Content
          style={{
            margin: "24px 16px 0",
            flex: "1 0 auto",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <LayoutFooter />
      </Layout>
    </Layout>
  );
};

export { Dashboard };
