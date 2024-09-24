import React from "react";
import { Table, Button, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faFileImport,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faker } from "@faker-js/faker";

interface DataType {
  key: React.Key;
  orderId: string;
  customerName: string;
  nickname: string;
  deliveryDate: string;
  pricingPolicy: string;
  deliveryFee: string;
  paymentStatus: string;
  deliveryStatus: string;
}

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const OrderDetail = () => {
  const [datas, setDatas] = React.useState<DataType[]>([]);

  const createFakeData = () => {
    const arr: DataType[] = [];
    for (let i = 0; i < 100; i++) {
      arr.push({
        key: i,
        orderId: faker.string.uuid(),
        customerName: faker.person.fullName(),
        nickname: faker.internet.userName(),
        deliveryDate: faker.date.future().toISOString().split('T')[0],
        pricingPolicy: getRandomElement(['Standard', 'Premium']),
        deliveryFee: faker.commerce.price({ min: 10, max: 50 }) + "€",
        paymentStatus: getRandomElement(['Complete', 'Bank Transfer', 'Pending']),
        deliveryStatus: getRandomElement(['Complete', 'Preparing', 'Shipped']),
      });
    }
    setDatas(arr);
  };

  React.useEffect(() => {
    createFakeData();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
    {
      title: "Pricing Policy",
      dataIndex: "pricingPolicy",
      key: "pricingPolicy",
    },
    {
      title: "Delivery Fee",
      dataIndex: "deliveryFee",
      key: "deliveryFee",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <>
          <Button type="link">Open Documentation</Button>
          <Button type="link">Setup Details</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Title level={3}>Product Management</Title>
      <div className="flex items-center justify-between mb-2">
        <Search
          placeholder="Search by name or code"
          style={{ width: 300 }}
          allowClear
          enterButton
        />
        <div className="flex">
          <Tooltip title="Create">
            <Button type="primary" className="mr-2">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Tooltip>
          <Tooltip title="Export">
            <Button className="mr-2">
              <FontAwesomeIcon icon={faFileExport} />
            </Button>
          </Tooltip>
          <Tooltip title="Import">
            <Button className="mr-2">
              <FontAwesomeIcon icon={faFileImport} />
            </Button>
          </Tooltip>
          <Tooltip title="Config">
            <Button className="mr-2">
              <FontAwesomeIcon icon={faListAlt} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={datas}
        scroll={{ y: 400 }}
        sticky={{ offsetHeader: 64 }}
      />
    </>
  );
};

export default OrderDetail;
