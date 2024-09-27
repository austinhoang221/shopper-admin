import {
  Button,
  Table,
  Switch,
  Space,
  Badge,
  Tooltip,
  Tag,
  message,
} from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableColumnsType, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faFileImport,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import datas from "./DummyData";
import { useTableScroll } from "@hooks/tableHook/useTableHook";
import ProductCategoryDrawer from "./drawer/ProductCategoryDrawer";
import { useNavigate } from "react-router-dom";

export interface DataType {
  value: React.ReactNode;
  title: string;
  products: string;
  active: boolean;
  status: string;
  featured: boolean;
  children?: DataType[];
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const ProductCategory = () => {
  const { tableRef, scroll } = useTableScroll();
  const [isLoading, setIsLoading] = React.useState(true);
  const [categories, setCategories] = React.useState<DataType[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      width: 300,
    },

    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      align: "center",
      width: 100,
      render: (featured: any) => (
        <Space>
          {featured ? <Badge status="success" /> : <Badge status="error" />}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "center",
      render: (status: any) => (
        <Space>
          <Tag color={status === "Available" ? "success" : "default"}>
            {status}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 100,
      align: "center",
      render: (active: any) => (
        <Switch className="text-center" checked={active} />
      ),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: () => (
    //     <Space>
    //       <Button icon={<EditOutlined />}>Edit</Button>
    //       <Button icon={<DeleteOutlined />} danger>
    //         Delete
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  React.useEffect(() => {
    setCategories(datas);
    setIsLoading(false);
  }, []);

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const onCreateItem = (item: A) => {
    messageApi.open({
      type: "success",
      content: "Successfully created a new category",
    });
    setCategories((data) => [item, ...data]);
    setIsLoading(false);
  };

  return (
    <>
      <Title level={3}>Product Category Management</Title>
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
            <Button className="mr-2">
              <FontAwesomeIcon icon={faListAlt} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Table<DataType>
        ref={tableRef}
        loading={isLoading}
        scroll={scroll}
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly: true }}
        dataSource={categories}
      />
      {contextHolder}
      <ProductCategoryDrawer onCreate={onCreateItem} />
    </>
  );
};

export default ProductCategory;
