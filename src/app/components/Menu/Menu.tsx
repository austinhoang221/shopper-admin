import React from "react";
import { Menu as AntMenu, MenuProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Sider from "antd/es/layout/Sider";

type Props = {};

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const Menu = (props: Props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/login">
          <span className="ml-2">Logout</span>
        </a>
      ),
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    },
  ];
  return (
    <Sider
      style={siderStyle}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <h1 className="text-white leading-[56px] text-center">Logo</h1>
      <AntMenu theme="dark" mode="inline" items={items} className="px-2" />
    </Sider>
  );
};

export default Menu;
