import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, MenuProps } from "antd";
import "./Header.scss";
type Props = {};

const Header = (props: Props) => {
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
    <>
      <nav className="header px-4">
        <div></div>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button type="text" icon={<FontAwesomeIcon icon={faUser} />}></Button>
        </Dropdown>
      </nav>
    </>
  );
};

export default Header;
