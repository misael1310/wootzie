import React from "react";
import { Layout } from "antd";
import Link from "antd/es/typography/Link";

const { Footer } = Layout;
const LayoutFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Made with ♥ by {""}
      <Link href="https://github.com/misael1310" target="_blank">
        Misael Perez
      </Link>
    </Footer>
  );
};

export { LayoutFooter };
