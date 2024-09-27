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
type FieldType = {
  name: string;
  code: string;
  txdesc: string;
  costprice: number;
  sellingprice: number;
  stock: number;
  unit: string;
  weight: number;
  supplier: string;
};
type Props = {
  onCreate: (data: FieldType) => void;
};

const ProductDrawer = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const params = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const initialForm = {
    name: "",
    code: "",
    txdesc: "",
    costprice: 0,
    sellingprice: 0,
    stock: 0,
    unit: "1",
    weight: 0,
    supplier: "1",
  };
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
        {params?.config?.[0].toUpperCase() + params?.config?.substring(1)! ??
          ""}
      </Title>
      <Button onClick={onClose} type="text">
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
      const validate = await form.validateFields();
      if (validate) {
        setIsLoading(true);
        setTimeout(() => {
          props.onCreate(form.getFieldsValue());
          onClose();
          setIsLoading(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  const onRenderFooter = (
    <div className="flex items-center justify-between">
      <Button onClick={() => onClose()}>Cancel</Button>
      <Button
        loading={isLoading}
        htmlType="submit"
        type="primary"
        onClick={onFinish}
      >
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
        name="form"
        initialValues={initialForm}
        onFinish={onFinish}
      >
        <Row gutter={18}>
          <Col span={12}>
            <Card hoverable title="General Information">
              <Typography.Title level={5}>Code</Typography.Title>
              <Form.Item<FieldType>
                name="code"
                required={true}
                rules={[
                  { required: true, message: "Please input product code" },
                ]}
              >
                <Input />
              </Form.Item>
              <Typography.Title level={5}>Name</Typography.Title>
              <Form.Item<FieldType>
                name="name"
                required={true}
                rules={[
                  { required: true, message: "Please input product name" },
                ]}
              >
                <Input />
              </Form.Item>
              <Typography.Title level={5}>Decsription</Typography.Title>
              <Form.Item<FieldType> name="txdesc">
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
                  <Typography.Title level={5}>Cost Price</Typography.Title>
                  <Form.Item<FieldType>
                    name="costprice"
                    required={true}
                    rules={[
                      { required: true, message: "Please input cost price" },
                    ]}
                  >
                    <InputNumber<number>
                      className="w-full"
                      formatter={(value) =>
                        `€${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Typography.Title level={5}>Selling Price</Typography.Title>
                  <Form.Item<FieldType>
                    name="sellingprice"
                    required={true}
                    rules={[
                      { required: true, message: "Please input selling price" },
                    ]}
                  >
                    <InputNumber<number>
                      className="w-full"
                      formatter={(value) =>
                        `€${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Typography.Title level={5}>Stock</Typography.Title>
                  <Form.Item<FieldType> name="stock">
                    <InputNumber<number> className="w-full" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={18}>
                <Col span={8}>
                  <Typography.Title level={5}>Unit</Typography.Title>

                  <Form.Item<FieldType>
                    name="unit"
                    required={true}
                    rules={[
                      { required: true, message: "Please input product unit" },
                    ]}
                  >
                    <Select options={unitData}></Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Typography.Title level={5}>Weight</Typography.Title>

                  <Form.Item<FieldType>
                    name="weight"
                    required={true}
                    rules={[
                      {
                        required: true,
                        message: "Please input product weight",
                      },
                    ]}
                  >
                    <InputNumber<number> className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Typography.Title level={5}>Supplier</Typography.Title>

                  <Form.Item<FieldType> name="supplier">
                    <Select options={supplierData}></Select>
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
