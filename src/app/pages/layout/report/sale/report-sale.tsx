import React from "react";
import "./report-sale.scss";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Button, Card, Table, TableColumnsType, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import { faker } from "@faker-js/faker";
import Paragraph from "antd/es/typography/Paragraph";
import { useTableScroll } from "@hooks/tableHook/useTableHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faFileImport, faListAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import Search from "antd/es/input/Search";

type Props = {};
const ReportSale = (props: Props) => {
  const barChart = {
    series: [
      {
        name: "Online Sales",
        data: Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 500) + 100
        ),
      },
      {
        name: "Offline Sales",
        data: Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 500) + 100
        ),
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      color: ["tomato", "aqua"],
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            //colors: [],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val: number) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };

  const [products, setProducts] = React.useState<DataType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { tableRef, scroll } = useTableScroll();
  interface DataType {
    key: React.Key;
    time: string;
    onlineRevenue: string;
    offlineRevenue: string;
    return: string;
    totalRevenue: string;
  }

  const createFakeData = () => {
    const arr: DataType[] = [];
    for (let i = 0; i < 100; i++) {
      arr.push({
        key: faker.string.uuid(),
        time: faker.date.past().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        onlineRevenue: faker.commerce.price(),
        offlineRevenue: faker.commerce.price(),
        return: faker.commerce.price(),
        totalRevenue: faker.commerce.price(),
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
      title: "Time",
      dataIndex: "time",
      width: 100,
      align: "center",
      sorter: (a, b) => a.time.length - b.time.length,
    },
    {
      title: "Online Revenue",
      width: 120,
      dataIndex: "onlineRevenue",
      key: "onlineRevenue",
      align: "left",
      sorter: (a, b) => a.onlineRevenue.length - b.onlineRevenue.length,
    },
    {
      title: "Offline Revenue",
      width: 120,
      dataIndex: "offlineRevenue",
      key: "offlineRevenue",
      align: "left",
      sorter: (a, b) => a.offlineRevenue.length - b.offlineRevenue.length,
    },
    {
      title: "Return Amt",
      width: 120,
      dataIndex: "return",
      key: "return",
      align: "left",
      sorter: (a, b) => a.return.length - b.return.length,
    },
    {
      title: "Total Revenue",
      width: 120,
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      align: "left",
      sorter: (a, b) => a.totalRevenue.length - b.totalRevenue.length,
    },
  ];

  return (
    <div className="product">
      <Card bordered={false} className="criclebox h-full">
        <div className="linechart">
          <div>
            <Title level={5}>Active Users</Title>
            <Paragraph className="lastweek">
              than last week <span className="bnb2">+30%</span>
            </Paragraph>
          </div>
        </div>

        <ReactApexChart
          className="full-width"
          options={barChart.options as ApexOptions}
          series={barChart.series}
          type="bar"
          height={250}
          width={"100%"}
        />
      </Card>
      <Title level={3}>Carrier Management</Title>
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

export default ReportSale;
