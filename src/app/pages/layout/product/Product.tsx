import {
  Button,
  Table,
  TableColumnsType,
  Tooltip,
  Image,
  Popover,
  CheckboxOptionType,
  Checkbox,
  message,
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
import "./Product.scss";
import { useTableScroll } from "@hooks/tableHook/useTableHook";
import { useNavigate } from "react-router-dom";
import ProductDrawer from "./drawer/ProductDrawer";

type Props = {};
const Product = (props: Props) => {
  const [products, setProducts] = React.useState<DataType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [searchText, setSearchText] = React.useState<string>("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { tableRef, scroll } = useTableScroll();
  const [open, setOpen] = useState(false);
  interface DataType {
    key: React.Key;
    // img: string;
    name: string;
    code: string;
    costprice: string;
    sellingprice: string;
    stock: number;
    supplier: string;
    createdt: string;
    unit: string;
    weight: string;
    txdesc: string;
  }

  const createFakeData = () => {
    const arr: DataType[] = [];
    for (let i = 0; i < 100; i++) {
      const units = ["Piece", "Box", "Pack", "Set"];
      const unit = units[Math.floor(Math.random() * units.length)];
      const date = faker.date.past();
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      arr.push({
        key: faker.string.uuid(),
        // img: faker.image.url(),
        name: faker.commerce.product(),
        code: `PRO${i}`,
        costprice: faker.commerce.price({ min: 10, max: 50 }),
        sellingprice: faker.commerce.price({ min: 10, max: 50 }),
        stock: Math.floor(Math.random() * 10) + 1,
        supplier: faker.company.name(),
        createdt: formattedDate.toString(),
        txdesc: faker.commerce.productDescription(),
        unit: unit,
        weight: `${Math.floor(Math.random() * 150)}g`,
      });
    }
    setProducts(arr);
  };

  React.useEffect(() => {
    createFakeData();
    setIsLoading(false);
  }, []);

  const onSearch = (value: string) => {
    setIsLoading(true);
    if (value) {
      setTimeout(() => {
        setProducts((prev) =>
          prev.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        );
        setIsLoading(false);
      }, 1500);
    } else {
      createFakeData();
      setIsLoading(false);
    }
  };

  const columns: TableColumnsType<DataType> = [
    // {
    //   title: "Image",
    //   width: 150,
    //   align: "center",
    //   render: (item: DataType) => (
    //     <Image width={100} src={item.img} height={100} />
    //   ),
    // },
    {
      title: "Code",
      width: 100,
      dataIndex: "code",
      key: "code",
      align: "left",
      sorter: (a, b) => a.code.length - b.code.length,
    },
    {
      title: "Name",
      width: 120,
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (text: string) => <a className="text-primary">{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Cost price",
      dataIndex: "costprice",
      key: "costprice",
      width: 150,
      align: "right",
      sorter: (a, b) => a.costprice.length - b.costprice.length,
      render: (text: string) => <span>{text}€</span>,
    },
    {
      title: "Selling price",
      dataIndex: "sellingprice",
      key: "sellingprice",
      width: 150,
      align: "right",
      sorter: (a, b) => a.sellingprice.length - b.sellingprice.length,
      render: (text: string) => <span>{text}€</span>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 100,
      align: "right",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      width: 150,
      align: "left",
      sorter: (a, b) => a.supplier.length - b.supplier.length,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: 100,
      align: "center",
      sorter: (a, b) => a.unit.length - b.unit.length,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      width: 100,
      align: "center",
      sorter: (a, b) => a.weight.length - b.weight.length,
    },
    {
      title: "Description",
      dataIndex: "txdesc",
      key: "txdesc",
      width: 250,
      align: "left",
      sorter: (a, b) => a.txdesc.length - b.txdesc.length,
    },
    {
      title: "Created date",
      dataIndex: "createdt",
      key: "createdt",
      width: 150,
      align: "center",
    },
  ];

  const onCreateItem = (data: A) => {
    setIsLoading(true);
    setProducts((prev) => [data, ...prev]);
    messageApi.open({
      type: "success",
      content: "Successfully created a new product",
    });
    setIsLoading(false);
  };

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [newColumns, setNewColumns] = React.useState(columns);

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

  const reset = () => {
    setNewColumns(columns);
  };

  return (
    <div className="product">
      <Title level={3}>Product Management</Title>
      <div className="flex items-center justify-between mb-4">
        <Search
          placeholder="Search by name or code"
          style={{ width: 300 }}
          allowClear
          value={searchText}
          onChange={(ev) => setSearchText(ev.target.value)}
          enterButton
          onSearch={onSearch}
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
          <Tooltip title="Configuration">
            <Popover
              placement="bottomRight"
              content={
                <>
                  <Checkbox.Group
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      width: "300px",
                    }}
                    value={checkedList}
                    options={options as CheckboxOptionType[]}
                    onChange={(value) => {
                      setCheckedList(value as string[]);
                    }}
                  />
                  <br />
                  <Button type="text" onClick={reset} className="mr-2">
                    Reset
                  </Button>
                  <Button type="primary" onClick={hide}>
                    Apply
                  </Button>
                </>
              }
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
        dataSource={products}
        loading={isLoading}
      />
      <ProductDrawer onCreate={onCreateItem} />
      {contextHolder}
    </div>
  );
};
export default Product;
