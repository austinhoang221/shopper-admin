import Editor from "@components/editor/Editor";
import ImageUploadList from "@components/imageUploadList/ImageUploadList";
import { faker } from "@faker-js/faker";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import React, { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

type Props = {};

const InvoiceDrawer = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const params = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const unitData = [
    {
      value: "1",
      label: "Piece",
    },
    {
      value: "2",
      label: "Box",
    },
    {
      value: "3",
      label: "Set",
    },
  ];
  const supplierData = [
    {
      value: "1",
      label: faker.company.name(),
    },
    {
      value: "2",
      label: faker.company.name(),
    },
    {
      value: "3",
      label: faker.company.name(),
    },
  ];

  React.useEffect(() => {
    if (params?.config) setIsDrawerOpen(true);
  }, [params?.config]);
  const onRenderTitle = () => (
    <div className="flex justify-between mx-2">
      <Title level={4}>
        {params?.config?.[0].toUpperCase() + params?.config?.substring(1)!}
      </Title>
      <Button onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </div>
  );

  const onClose = () => {
    setIsDrawerOpen(false);
    form.resetFields();
    navigate("/product");
  };

  const onFinish = async () => {
    try {
      await form.validateFields();
    } catch (error) {
      console.error("Form validation error:", error);
    }
    setIsDrawerOpen(false);
    navigate("/product");
  };

  const onRenderFooter = (
    <div className="flex items-center justify-between">
      <Button onClick={() => onClose()}>Cancel</Button>
      <Button htmlType="submit" type="primary">
        Save
      </Button>
    </div>
  );

  const defaultValue = dayjs(new Date());

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={onClose}
      closeIcon={false}
      title={onRenderTitle()}
      width="100%"
      footer={onRenderFooter}
    >
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={18}>
          <Col span={8}>
            <Card hoverable title="General Information">
              <Form.Item
                name="invoiceCode"
                rules={[
                  { required: true, message: "Please input invoice code" },
                ]}
              >
                <Typography.Title level={5}>Invoice Code</Typography.Title>
                <Input />
              </Form.Item>
              <Divider />
              <Form.Item name="creationTime">
                <Typography.Title level={5}>Creation Time</Typography.Title>
                <DatePicker defaultValue={defaultValue} showTime />
              </Form.Item>
              <Divider />
              <Form.Item
                name="customerName"
                rules={[
                  { required: true, message: "Please input customer name" },
                ]}
              >
                <Typography.Title level={5}>Customer Name</Typography.Title>
                <Input />
              </Form.Item>
              <Divider />
              <Form.Item
                name="orderCode"
                rules={[{ required: true, message: "Please input order code" }]}
              >
                <Typography.Title level={5}>Order Code</Typography.Title>
                <Input />
              </Form.Item>
              <Divider />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable title="Seller">
              <Form.Item
                name="code"
                rules={[
                  { required: true, message: "Please input status" },
                ]}
              >
                <Typography.Title level={5}>Status</Typography.Title>
                <Input />
              </Form.Item>
              <Divider />
              <Form.Item
                name="code"
                rules={[{ required: true, message: "Please input status" }]}
              >
                <Typography.Title level={5}>Status</Typography.Title>
                <Input />
              </Form.Item>
              <Divider />
              <Form.Item
                name="code"
                rules={[
                  { required: true, message: "Please input seller name" },
                ]}
              >
                <Typography.Title level={5}>Seller Name</Typography.Title>
                <Input />
              </Form.Item>
              <Divider />
              <Form.Item
                name="code"
                rules={[
                  { required: true, message: "Please input creator name" },
                ]}
              >
                <Typography.Title level={5}>Creator Name</Typography.Title>
                <Input />
              </Form.Item>
              <Divider />
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable title="Remark">
              <TextArea
                placeholder="Remark"
                autoSize={{ minRows: 20, maxRows: 20 }}
              />
            </Card>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default InvoiceDrawer;
