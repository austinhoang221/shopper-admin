import Editor from "@components/editor/Editor";
import ImageUploadList from "@components/imageUploadList/ImageUploadList";
import { faker } from "@faker-js/faker";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import Title from "antd/es/typography/Title";
import React, { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const ProductDrawer = (props: Props) => {
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
          <Col span={12}>
            <Card hoverable title="General Information">
              <Form.Item
                name="code"
                rules={[
                  { required: true, message: "Please input product code" },
                ]}
              >
                <Typography.Title level={5}>Code</Typography.Title>
                <Input />
              </Form.Item>

              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input product name" },
                ]}
              >
                <Typography.Title level={5}>Name</Typography.Title>
                <Input />
              </Form.Item>

              <Form.Item name="txdesc">
                <Typography.Title level={5}>Decsription</Typography.Title>
                <Editor />
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable title="Upload Image">
              <ImageUploadList />
            </Card>
            <Card hoverable title="Pricing and Stock" className="mt-4">
              <Row gutter={18}>
                <Col span={8}>
                  <Form.Item
                    name="costprice"
                    rules={[
                      { required: true, message: "Please input cost price" },
                    ]}
                  >
                    <Typography.Title level={5}>Cost Price</Typography.Title>
                    <InputNumber<number>
                      className="w-full"
                      formatter={(value) =>
                        `€${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="sellingprice"
                    rules={[
                      { required: true, message: "Please input selling price" },
                    ]}
                  >
                    <Typography.Title level={5}>Selling Price</Typography.Title>
                    <InputNumber<number>
                      className="w-full"
                      formatter={(value) =>
                        `€${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="stock">
                    <Typography.Title level={5}>Stock</Typography.Title>
                    <InputNumber<number> value={0} className="w-full" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={18}>
                <Col span={8}>
                  <Form.Item
                    name="unit"
                    rules={[
                      { required: true, message: "Please input product unit" },
                    ]}
                  >
                    <Typography.Title level={5}>Unit</Typography.Title>
                    <Select options={unitData} defaultValue={"1"}></Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input product weight",
                      },
                    ]}
                  >
                    <Typography.Title level={5}>Weight</Typography.Title>
                    <InputNumber<number> value={0} className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="supplier">
                    <Typography.Title level={5}>Supplier</Typography.Title>
                    <Select options={supplierData} defaultValue={"1"}></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ProductDrawer;
