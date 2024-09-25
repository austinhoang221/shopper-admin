import React from "react";
import {
  Table,
  Button,
  Tooltip,
  Space,
  Badge,
  Tag,
  TableColumnsType,
} from "antd";
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
import { useTableScroll } from "@hooks/tableHook/useTableHook";

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

const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const OrderDetail = () => {
  const [datas, setDatas] = React.useState<DataType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { tableRef, scroll } = useTableScroll();

  const createFakeData = () => {
    const arr: DataType[] = [];
    for (let i = 0; i < 100; i++) {
      const date = faker.date.past();
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      arr.push({
        key: i,
        orderId: faker.string.uuid(),
        customerName: faker.person.fullName(),
        nickname: faker.internet.userName(),
        deliveryDate: formattedDate.toString(),
        pricingPolicy: getRandomElement(["Standard", "Premium"]),
        deliveryFee: faker.commerce.price({ min: 10, max: 50 }) + "€",
        paymentStatus: getRandomElement([
          "Complete",
          "Bank Transfer",
          "Pending",
        ]),
        deliveryStatus: getRandomElement(["Complete", "Preparing", "Shipped"]),
      });
    }
    setDatas(arr);
  };

  React.useEffect(() => {
    createFakeData();
    setIsLoading(false);
  }, []);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: 200,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: 200,
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
      width: 150,
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      align: "center",
      width: 150,
    },
    {
      title: "Pricing",
      dataIndex: "pricingPolicy",
      key: "pricingPolicy",
      align: "center",
      width: 100,
      render: (pricingPolicy: any) => (
        <Space>
          <Tag color={pricingPolicy === "Premium" ? "success" : "default"}>
            {pricingPolicy}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Delivery Fee",
      dataIndex: "deliveryFee",
      key: "deliveryFee",
      width: 120,
      align: "right",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      align: "center",
      width: 150,
      render: (paymentStatus: any) => (
        <Space>
          <Tag
            color={
              paymentStatus === "Complete"
                ? "success"
                : paymentStatus === "Pending"
                ? "processing"
                : "default"
            }
          >
            {paymentStatus}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      align: "center",
      width: 130,
      render: (deliveryStatus: any) => (
        <Space>
          <Tag
            color={
              deliveryStatus === "Complete"
                ? "success"
                : deliveryStatus === "Preparing"
                ? "processing"
                : "default"
            }
          >
            {deliveryStatus}
          </Tag>
        </Space>
      ),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   width: 150,
    //   align: "center",
    //   render: () => (
    //     <>
    //       <Button type="link">Documentation</Button>
    //       <Button type="link">Setup</Button>
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <Title level={3}>Order Detail</Title>
      <div className="flex items-center justify-between mb-4">
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
        ref={tableRef}
        scroll={scroll}
        columns={columns}
        loading={isLoading}
        dataSource={datas}
      />
    </>
  );
};

export default OrderDetail;
