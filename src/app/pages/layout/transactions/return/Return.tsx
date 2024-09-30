import {
  Button,
  Table,
  TableColumnsType,
  Tooltip,
  Popover,
  CheckboxOptionType,
  Checkbox,
  Space,
  Tag,
} from "antd";
import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faFileImport,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useTableScroll } from "@hooks/tableHook/useTableHook";
import { useNavigate } from "react-router-dom";

type Props = {};
const Return = (props: Props) => {
  const [returns, setReturns] = React.useState<DataType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const { tableRef, scroll } = useTableScroll();
  const [open, setOpen] = useState(false);

  interface DataType {
    key: React.Key;
    returnCode: string;
    seller: string;
    time: string;
    customer: string;
    payCustomer: string;
    refundToCustomer: string;
    status: string;
  }

  const createFakeData = () => {
    const arr: DataType[] = [];
    for (let i = 0; i < 100; i++) {
      const amount = faker.commerce.price({ min: 10, max: 50 }) + "€";
      const date = faker.date.past();
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      arr.push({
        key: faker.string.uuid(),
        returnCode: `RC0000${i}`,
        seller: faker.person.fullName(),
        time: formattedDate.toString(),
        customer: faker.person.fullName(),
        payCustomer: amount,
        refundToCustomer: amount,
        status: "Paid",
      });
    }
    setReturns(arr);
  };

  React.useEffect(() => {
    createFakeData();
    setIsLoading(false);
  }, []);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Return Code",
      width: 120,
      key: "returnCode",
      dataIndex: "returnCode",
      align: "left",
    },
    {
      title: "Seller",
      width: 120,
      key: "seller",
      dataIndex: "seller",
      align: "left",
    },
    {
      title: "Time",
      width: 100,
      key: "time",
      dataIndex: "time",
      align: "center",
    },
    {
      title: "Customer",
      key: "customer",
      dataIndex: "customer",
      width: 150,
      align: "left",
    },
    {
      title: "Pay Customer",
      key: "payCustomer",
      dataIndex: "payCustomer",
      width: 100,
      align: "right",
    },
    {
      title: "Refund",
      key: "refundToCustomer",
      dataIndex: "refundToCustomer",
      width: 100,
      align: "right",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      width: 80,
      render: (status: any) => (
        <Space>
          <Tag color={"success"}>{status}</Tag>
        </Space>
      ),
    },
  ];

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [newColumns, setNewColumns] = useState(columns);

  const options = columns.map(({ key, title }) => ({
    value: key,
    label: title,
  }));

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const hide = () => {
    const updatedColumns = columns.map((item) => ({
      ...item,
      hidden: !checkedList.includes(item.key as string),
    }));
    setNewColumns(updatedColumns);
    setOpen(false);
  };

  return (
    <div className="product">
      <Title level={3}>Return Management</Title>
      <div className="flex items-center justify-between mb-4">
        <Search
          placeholder="Search by name or code"
          style={{ width: 300 }}
          allowClear
          enterButton
        />
        <div className="flex">
          <Tooltip title="Create">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => navigate("create")}
            >
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
            <Popover
              placement="bottomRight"
              content={
                <>
                  <Checkbox.Group
                    style={{ width: "300px" }}
                    value={checkedList}
                    options={options as CheckboxOptionType[]}
                    onChange={(value) => {
                      setCheckedList(value as string[]);
                    }}
                  />
                  <br />
                  <Button onClick={hide}>Apply</Button>
                </>
              }
              title="Title"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Button className="mr-2">
                <FontAwesomeIcon icon={faListAlt} />
              </Button>
            </Popover>
          </Tooltip>
        </div>
      </div>
      <Table
        ref={tableRef}
        scroll={scroll}
        rowSelection={{}}
        columns={newColumns}
        dataSource={returns}
        loading={isLoading}
      />
    </div>
  );
};

export default Return;
