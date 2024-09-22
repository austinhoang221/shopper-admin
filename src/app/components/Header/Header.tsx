import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Layout, MenuProps } from "antd";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
type Props = {};

const AntHeader = Layout.Header;

const Header = (props: Props) => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span className="ml-2" onClick={() => navigate("/login")}>
          Logout
        </span>
      ),
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    },
  ];
  return (
    <>
      <AntHeader className="px-4 bg-white sticky top-0 h-[56px] flex items-center justify-between z-10">
        <div></div>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button type="text" icon={<FontAwesomeIcon icon={faUser} />}></Button>
        </Dropdown>
      </AntHeader>
    </>
  );
};

export default Header;
