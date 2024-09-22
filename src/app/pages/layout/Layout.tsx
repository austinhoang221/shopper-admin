import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import { Layout as AntLayout } from "antd";
import { Content } from "antd/es/layout/layout";
import Menu from "@components/menu/Menu";
import ServerError from "@pages/serverError/serverError";
import NotFound from "@pages/notfound/NotFound";

type Props = {};

const Layout = (props: Props) => {
  const [isShowServerError, setIsShowServerError] =
    React.useState<boolean>(false);
  const [isShowNotFoundPage, setIsShowNotFoundPage] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const handleShowServerErrorPage = () => {
      if (localStorage.getItem("IsServerError") === "true") {
        setIsShowServerError(true);
        localStorage.removeItem("IsServerError");
      }
    };

    window.addEventListener("storage", handleShowServerErrorPage);

    return () => {
      window.removeEventListener("storage", handleShowServerErrorPage);
    };
  }, []);

  React.useEffect(() => {
    const handleShowNotFoundPage = () => {
      if (localStorage.getItem("isShowNotFoundPage") === "true") {
        setIsShowNotFoundPage(true);
        localStorage.removeItem("isShowNotFoundPage");
      }
    };

    window.addEventListener("storage", handleShowNotFoundPage);

    return () => {
      window.removeEventListener("storage", handleShowNotFoundPage);
    };
  }, []);

  const render = (): React.JSX.Element => {
    let res: React.JSX.Element = (
      <AntLayout className="bg-white" hasSider>
        <Menu />
        <AntLayout className="bg-white">
          <Header />
          <Content className="mx-8 my-4">
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    );
    // if (isShowServerError) {
    //   res = renderServerErrorPage();
    // } else if (isShowNotFoundPage) {
    //   res = renderNotFoundPage();
    // }
    return res;
  };

  const renderServerErrorPage = () => <ServerError />;

  const renderNotFoundPage = () => <NotFound />;

  return (
    <AntLayout className="bg-white" hasSider>
      <Menu />
      <AntLayout className="bg-white">
        <Header />
        <Content className="mx-8 my-4">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
