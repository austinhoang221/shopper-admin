import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Layout, MenuProps } from "antd";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
type Props = {};

const AntHeader = Layout.Header;

const Header = (props: Props) => {
  const navigate = useNavigate();
  const logOut = () => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.context = undefined;
    navigate("/login");
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={logOut}>Logout</span>,
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    },
  ];
  return (
    <>
      <AntHeader className="px-4 bg-white sticky top-0 h-[56px] flex items-center justify-between z-10 border-b-[1px]">
        <div></div>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button type="text" icon={<FontAwesomeIcon icon={faUser} />}></Button>
        </Dropdown>
      </AntHeader>
    </>
  );
};

export default Header;
