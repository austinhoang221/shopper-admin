import { Button, Table, Switch, Space, Badge, Tooltip } from "antd";
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

export interface DataType {
  key: React.ReactNode;
  name: string;
  featured: boolean;
  products: string;
  status: string;
  active: boolean;
  children?: DataType[];
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const ProductCategory = () => {
  const { tableRef, scroll } = useTableScroll();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render: (featured: any) => (
        <Space>
          {featured ? <Badge status="success" /> : <Badge status="error" />}
        </Space>
      ),
      align: "center",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => <Switch checked={status === "Active"} />,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active: any) => <Switch checked={active} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />}>Edit</Button>
          <Button icon={<DeleteOutlined />} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
      <Table<DataType>
        ref={tableRef}
        scroll={scroll}
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly: true }}
        dataSource={datas}
      />
    </>
  );
};

export default ProductCategory;
