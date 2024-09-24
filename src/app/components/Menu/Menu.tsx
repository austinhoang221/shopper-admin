import React from "react";
import { Menu as AntMenu, MenuProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartPie,
  faCubes,
  faDollyFlatbed,
  faExchange,
  faFileEdit,
  faFileInvoiceDollar,
  faHome,
  faInbox,
  faLanguage,
  faPaste,
  faPersonCane,
  faReplyAll,
  faTh,
  faUserAlt,
  faUserFriends,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const Menu = (props: Props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const items: MenuProps["items"] = [
    {
      key: "dashboard",
      label: (
        <Link to="/dashboard">
          <span className="ml-2">Dashboard</span>
        </Link>
      ),
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      key: "category",
      label: (
        <Link to="/category">
          <span className="ml-2">Categories</span>
        </Link>
      ),
      icon: <FontAwesomeIcon icon={faCubes} />,
    },
    {
      key: "product",
      label: (
        <Link to="/product">
          <span className="ml-2">Products</span>
        </Link>
      ),
      icon: <FontAwesomeIcon icon={faTh} />,
    },
    // {
    //   key: "order",
    //   label: (
    //     <Link to="/order">
    //       <span className="ml-2">Order Management</span>
    //     </Link>
    //   ),
    //   icon: <FontAwesomeIcon icon={faUserTie} />,
    //   children: [
    //     {
    //       key: "order-details",
    //       label: (
    //         <Link to="/order/order-details">
    //           <span className="ml-2">Order Detail</span>
    //         </Link>
    //       ),
    //       icon: <FontAwesomeIcon icon={faUserAlt} />,
    //     },
    //   ],
    // },
    {
      key: "transaction",
      label: (
        <Link to="/transaction">
          <span className="ml-2">Transaction</span>
        </Link>
      ),
      icon: <FontAwesomeIcon icon={faExchange} />,
      children: [
        {
          key: "transaction-order",
          label: (
            <Link to="transaction/transaction-order">
              <span className="ml-2">Orders</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faInbox} />,
        },
        {
          key: "transaction-invoice",
          label: (
            <Link to="/transaction/transaction-invoice">
              <span className="ml-2">Invoices</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
        },
        {
          key: "transaction-shipping",
          label: (
            <Link to="/transaction/transaction-shipping">
              <span className="ml-2">Shipping</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faFileEdit} />,
        },
        {
          key: "transaction-return",
          label: (
            <Link to="transaction/transaction-return">
              <span className="ml-2">Return</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faReplyAll} />,
        },
        {
          key: "purchase-receipt",
          label: (
            <Link to="/transaction/purchase-receipt">
              <span className="ml-2">Purchase Receipt</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faDollyFlatbed} />,
        },
      ],
    },
    {
      key: "partner",
      label: (
        <Link to="/partner">
          <span className="ml-2">Partners</span>
        </Link>
      ),
      icon: <FontAwesomeIcon icon={faUserTie} />,
      children: [
        {
          key: "partner-customer",
          label: (
            <Link to="/partner/partner-customer">
              <span className="ml-2">Customers</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faUserAlt} />,
        },
        {
          key: "partner-suppliers",
          label: (
            <Link to="/partner/partner-suppliers">
              <span className="ml-2">Suppliers</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faUserFriends} />,
        },
        {
          key: "partner-carrier",
          label: (
            <Link to="/partner/partner-carrier">
              <span className="ml-2">Carriers</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faPersonCane} />,
        },
      ],
    },
    {
      key: "report",
      label: (
        <Link to="/report">
          <span className="ml-2">Report</span>
        </Link>
      ),
      icon: <FontAwesomeIcon icon={faChartLine} />,
      children: [
        {
          key: "report-end-of-day",
          label: (
            <Link to="/report/report-end-of-day">
              <span className="ml-2">End of day</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faChartPie} />,
        },
        {
          key: "report-sale",
          label: (
            <Link to="/report/report-sale">
              <span className="ml-2">Sale</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faPaste} />,
        },
        {
          key: "report-product",
          label: (
            <Link to="/report/report-product">
              <span className="ml-2">Product</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faCubes} />,
        },
        {
          key: "report-customer",
          label: (
            <Link to="/report/report-customer">
              <span className="ml-2">Customer</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faUserAlt} />,
        },
        {
          key: "report-supplier",
          label: (
            <Link to="/report/report-supplier">
              <span className="ml-2">Supplier</span>
            </Link>
          ),
          icon: <FontAwesomeIcon icon={faUserFriends} />,
        },
      ],
    },
    {
      key: "i18n",
      label: (
        <Link to="/i18n">
          <span className="ml-2">Languages</span>
        </Link>
      ),
      icon: <FontAwesomeIcon icon={faLanguage} />,
    },
  ];
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <h1 className="text-white leading-[56px] text-center">Logo</h1>
      <AntMenu
        theme="dark"
        mode="inline"
        items={items}
        className="px-2"
        selectedKeys={[location.pathname.split("/").pop()!]}
      />
    </Sider>
  );
};

export default Menu;
