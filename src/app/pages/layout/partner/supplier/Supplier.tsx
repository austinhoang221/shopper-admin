import { Button, Table, TableColumnsType, Tooltip, Image } from "antd";
import React from "react";
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
import "./Supplier.scss";
import { useTableScroll } from "@hooks/tableHook/useTableHook";

type Props = {};

const Supplier = (props: Props) => {
    const [products, setProducts] = React.useState<DataType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const { tableRef, scroll } = useTableScroll();
    interface DataType {
      key: React.Key;
      name: string;
      phone: string;
      address: string;
    }
  
    const createFakeData = () => {
      const arr: DataType[] = [];
      for (let i = 0; i < 100; i++) {
        arr.push({
          key: faker.string.uuid(),
          name: faker.company.name(),
          phone: faker.phone.number(),
          address: faker.location.country(),
        });
      }
      setProducts(arr);
    };
  
    React.useEffect(() => {
      createFakeData();
      setIsLoading(false);
    }, []);
  
    const columns: TableColumnsType<DataType> = [
      {
        title: "Supplier",
        dataIndex: "name",
        width: 150,
        align: "left",
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: "Phone",
        width: 100,
        dataIndex: "phone",
        key: "phone",
        align: "left",
        sorter: (a, b) => a.phone.length - b.phone.length,
      },
      {
        title: "Address",
        width: 120,
        dataIndex: "address",
        key: "address",
        align: "left",
        sorter: (a, b) => a.address.length - b.address.length,
      },
    ];
  
    return (
      <div className="product">
        <Title level={3}>Supplier Management</Title>
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
          rowSelection={{}}
          columns={columns}
          dataSource={products}
          loading={isLoading}
        />
      </div>
    );
  };

export default Supplier;
