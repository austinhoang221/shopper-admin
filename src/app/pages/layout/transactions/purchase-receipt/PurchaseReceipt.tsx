import {
    Button,
    Table,
    TableColumnsType,
    Tooltip,
    Popover,
    CheckboxOptionType,
    Checkbox,
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
  const PurchaseReceipt = (props: Props) => {
    const [purchaseReceipts, setPurchaseReceipts] = React.useState<DataType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const navigate = useNavigate();
    const { tableRef, scroll } = useTableScroll();
    const [open, setOpen] = useState(false);
    
    interface DataType {
      key: React.Key;
      purchaseReceiptNo: string;
      time: string;
      invoiceNo: string;
      returnCode: string;
      customer: string;
      amount: string;
      discount: string;
      paidCustomer: string;
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
          purchaseReceiptNo: `PR0000${i}`,
          time: formattedDate.toString(),
          invoiceNo: `IN0000${i}`,
          returnCode: "",
          customer: faker.person.fullName(),
          amount: amount,
          discount: '0',
          paidCustomer: amount,
        });
      }
      setPurchaseReceipts(arr);
    };
  
    React.useEffect(() => {
      createFakeData();
      setIsLoading(false);
    }, []);
  
    const columns: TableColumnsType<DataType> = [
        {
            title: "Purchase Receipt No",
            width: 150,
            key: "purchaseReceiptNo",
            dataIndex: "purchaseReceiptNo",
            align: "center",
          },
        {
            title: "Creation Time",
            width: 100,
            key: "time",
            dataIndex: "time",
            align: "left",
        },
        {
          title: "Invoice No",
          width: 150,
          key: "invoiceNo",
          dataIndex: "invoiceNo",
          align: "center",
        },
      {
        title: "Return Code",
        width: 120,
        key: "returnCode",
        dataIndex: "returnCode",
        align: "left",
      },
      {
        title: "Customer",
        key: "customer",
        dataIndex: "customer",
        width: 150,
        align: "right",
      },
      {
        title: "Amount",
        key: "amount",
        dataIndex: "amount",
        width: 150,
        align: "right",
      },
      {
        title: "Discount",
        key: "discount",
        dataIndex: "discount",
        width: 100,
        align: "right",
      },
      {
        title: "Paid Customer",
        key: "paidCustomer",
        dataIndex: "paidCustomer",
        width: 150,
        align: "left",
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
      const updatedColumns = columns.map(item => ({
        ...item,
        hidden: !checkedList.includes(item.key as string),
      }));
      setNewColumns(updatedColumns);
      setOpen(false);
    };
  
    return (
      <div className="product">
        <Title level={3}>Purchase Receipt Management</Title>
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
                      options={options as  CheckboxOptionType[]}
                      onChange={(value) => {
                        setCheckedList(value as string[]);
                      }}
                    /><br/>
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
          dataSource={purchaseReceipts}
          loading={isLoading}
        />
      </div>
    );
  };
  
  export default PurchaseReceipt;
  