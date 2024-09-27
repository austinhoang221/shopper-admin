import {
  faPlusCircle,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyDatas } from "@pages/layout/transactions/transaction-order/transaction-order-drawer/DummyData";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Switch,
  TreeSelect,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import datas from "../DummyData";

type FieldType = {
  title: string;
  parent: string;
  active: boolean;
};

type Props = {
  onCreate: (data: FieldType) => void;
};

const initialForm = {
  title: "",
  active: true,
  parent: "",
  items: [
    {
      name: "",
      type: "1",
    },
  ],
};

const ProductCategoryDrawer = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const params = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (params?.config) setIsDrawerOpen(true);
  }, [params?.config]);

  const inputType = [
    {
      value: "1",
      label: "Radio",
    },
    {
      value: "2",
      label: "Checkbox",
    },
  ];
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
    navigate("/category");
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
      width="30%"
      footer={onRenderFooter}
    >
      <Form
        form={form}
        name="form"
        initialValues={initialForm}
        onFinish={onFinish}
      >
        <Row gutter={18}>
          <Col span={18}>
            <Typography.Title level={5}>Name</Typography.Title>
            <Form.Item<FieldType>
              name="title"
              required={true}
              rules={[
                { required: true, message: "Please input category name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Typography.Title level={5}>Active</Typography.Title>
            <Form.Item<FieldType> name="active" required={true}>
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={5}>Parent category</Typography.Title>
        <Form.Item<FieldType> name="parent">
          <TreeSelect
            showSearch
            className="w-full"
            allowClear
            //   treeDefaultExpandAll
            treeData={datas}
            //   onPopupScroll={onPopupScroll}
          />
        </Form.Item>
        <Typography.Title level={5}>Filters</Typography.Title>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div className="flex flex-col">
              {fields.map((field, index) => (
                <Row key={field.key} gutter={8}>
                  <Col span={14}>
                    <Form.Item name={[field.name, "name"]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={[field.name, "type"]}>
                      <Select className="w-full" options={inputType}></Select>
                    </Form.Item>
                  </Col>
                  {fields.length > 1 && (
                    <Col span={2}>
                      <Button
                        type="dashed"
                        icon={<FontAwesomeIcon icon={faXmarkCircle} />}
                        onClick={() => remove(index)}
                      ></Button>
                    </Col>
                  )}
                </Row>
              ))}
              <div>
                <Button
                  type="dashed"
                  className="w-full"
                  onClick={() =>
                    add({
                      name: "",
                      type: "1",
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </Button>
              </div>
            </div>
          )}
        </Form.List>
      </Form>
    </Drawer>
  );
};

export default ProductCategoryDrawer;
