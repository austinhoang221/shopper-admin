import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Layout as AntLayout } from "antd";
import { Content } from "antd/es/layout/layout";
import Menu from "@components/Menu/Menu";

type Props = {};

const Layout = (props: Props) => {
  return (
    <AntLayout hasSider>
      <Header />
      <Menu />
      <AntLayout style={{ marginInlineStart: 200 }} className="bg-white">
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
