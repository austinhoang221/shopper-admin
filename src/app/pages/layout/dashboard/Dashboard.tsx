import React from "react";
import {
  Card,
  Col,
  Progress,
  Row,
  Table,
  Tag,
  Timeline,
  Typography,
} from "antd";
import type { TableProps } from "antd";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "./Dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDollarToSlot,
  faDollyFlatbed,
  faInbox,
  faReplyAll,
} from "@fortawesome/free-solid-svg-icons";
type Props = {};

const { Title, Paragraph } = Typography;

const items1 = [
  {
    Title: "3,6K",
    user: "Users",
  },
  {
    Title: "2m",
    user: "Clicks",
  },
  {
    Title: "$772",
    user: "Sales",
  },
  {
    Title: "82",
    user: "Items",
  },
];

interface DataType {
  key: string;
  name: string;
  address: string;
  tags: string[];
  progress: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Rank",
    key: "rank",
    dataIndex: "rank",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "Golden Hour") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Progress",
    key: "progress",
    dataIndex: "progress",
    render: (text) => <Progress percent={text} />,
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    address: "New York No. 1 Lake Park",
    tags: ["Gold"],
    progress: 30,
  },
  {
    key: "2",
    name: "Jim Green",
    address: "London No. 1 Lake Park",
    tags: ["Gold"],
    progress: 70,
  },
  {
    key: "3",
    name: "Joe Black",
    address: "Sydney No. 1 Lake Park",
    tags: ["Silver"],
    progress: 50,
  },
  {
    key: "4",
    name: "Austin Hoang",
    address: "Paris No. 1 Lake Park",
    tags: ["Silver"],
    progress: 22,
  },
  {
    key: "5",
    name: "Christiano Ronaldo",
    address: "Siuuuuuu No. 1 Lake Park",
    tags: ["Bronze"],
    progress: 70,
  },
];

const timelineList = [
  {
    title: "$2,400 - Redesign store",
    time: "09 JUN 7:20 PM",
    color: "green",
  },
  {
    title: "New order #3654323",
    time: "08 JUN 12:20 PM",
    color: "green",
  },
  {
    title: "Company server payments",
    time: "04 JUN 3:10 PM",
  },
  {
    title: "New card added for order #4826321",
    time: "02 JUN 2:45 PM",
  },
  {
    title: "Unlock folders for development",
    time: "18 MAY 1:30 PM",
  },
  {
    title: "New order #46282344",
    time: "14 MAY 3:30 PM",
    color: "gray",
  },
];

const eChart = {
  series: [
    {
      name: "Sales",
      data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
      color: "#fff",
    },
  ],

  options: {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
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
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: Array(9).fill("#fff"),
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: Array(9).fill("#fff"),
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

const lineChart = {
  series: [
    {
      name: "Mobile apps",
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
      offsetY: 0,
    },
    {
      name: "Websites",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      offsetY: 0,
    },
  ],

  options: {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },

    tooltip: {
      y: {
        formatter: function (val: any) {
          return val;
        },
      },
    },
  },
};

const Dashboard = (props: Props) => {
  return (
    <>
      <Row gutter={16} className="pd-bottom">
        <Col span={6}>
          <Card hoverable title="Today's Sales" bordered={false}>
            <Row>
              <Col span={18}>
                <span className="item-value">$53,0000 </span>
                <span className="bnb2">+20%</span>
              </Col>
              <Col span={6}>
                <span className="item-icon">
                  <FontAwesomeIcon icon={faCircleDollarToSlot} />
                </span>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable title="New Order" bordered={false}>
            <Row>
              <Col span={18}>
                <span className="item-value">3,200 </span>
                <span className="bnb2">+30%</span>
              </Col>
              <Col span={6}>
                <span className="item-icon">
                  <FontAwesomeIcon icon={faInbox} />
                </span>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable title="Purchase receipt" bordered={false}>
            <Row>
              <Col span={18}>
                <span className="item-value">$53,0000 </span>
                <span className="bnb3">-30%</span>
              </Col>
              <Col span={6}>
                <span className="item-icon">
                  <FontAwesomeIcon icon={faDollyFlatbed} />
                </span>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable title="Transaction Return" bordered={false}>
            <Row>
              <Col span={18}>
                <span className="item-value">100 </span>
                <span className="bnb2">+20%</span>
              </Col>
              <Col span={6}>
                <span className="item-icon">
                  <FontAwesomeIcon icon={faReplyAll} />
                </span>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-4">
          <Card bordered={false} className="criclebox h-full">
            <div id="chart">
              <ReactApexChart
                className="bar-chart"
                options={eChart.options as ApexOptions}
                series={eChart.series}
                type="bar"
                height={220}
              />
            </div>
            <div className="chart-vistior">
              <Title level={5}>Active Users</Title>
              <Paragraph className="lastweek">
                than last week <span className="bnb2">+30%</span>
              </Paragraph>
              <Paragraph className="lastweek">
                We have created multiple options for you to put together and
                customise into pixel perfect pages.
              </Paragraph>
              <Row>
                {items1.map((v, index) => (
                  <Col xs={6} xl={6} sm={6} md={6} key={index}>
                    <div className="chart-visitor-count">
                      <Title level={4}>{v.Title}</Title>
                      <span>{v.user}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-4">
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
              options={lineChart.options as ApexOptions}
              series={lineChart.series}
              type="area"
              height={350}
              width={"100%"}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="mb-4">
        <Col span={16}>
          <Card hoverable bordered={false} className="criclebox h-full">
            <div>
              <Title level={5}>Top customer</Title>
              <Paragraph className="lastweek">in this month</Paragraph>
            </div>
            <Table<DataType> columns={columns} dataSource={data} />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable bordered={false} className="criclebox h-full">
            <div className="timeline-box">
              <Title level={5}>Orders History</Title>
              <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                this month <span className="bnb2">20%</span>
              </Paragraph>

              <Timeline pending="Recording..." className="timelinelist">
                {timelineList.map((t, index) => (
                  <Timeline.Item color={t.color} key={index}>
                    <Title level={5}>
                      {t.time} : {t.title}
                    </Title>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
