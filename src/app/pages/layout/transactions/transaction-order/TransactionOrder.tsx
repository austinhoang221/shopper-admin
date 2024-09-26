import {
  Layout,
  Input,
  Button,
  List,
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Space,
  InputNumber,
} from "antd";
import React, { useState } from "react";
import { DeleteOutlined, PlusOutlined, MoreOutlined } from "@ant-design/icons";
import ProductSuggest from "./ProductSuggest";
import { datas, ProductSuggestType } from "./DummyData";

const { Header, Content } = Layout;
const { Search } = Input;
const { Text } = Typography;

const TransactionOrder = () => {
  const [productsInOrder, setProductsInOrder] = useState(datas);

  const onSearch = (value: string) => console.log(value);

  const updateQuantity = (id: string, newQuantity: number) => {
    const updatedProducts = productsInOrder.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setProductsInOrder(updatedProducts);
  };

  const removeProduct = (id: string) => {
    const filteredProducts = productsInOrder.filter(
      (product) => product.id !== id
    );
    setProductsInOrder(filteredProducts);
  };

  const getTotalPrice = () => {
    return productsInOrder.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const addProductToOrder = (item: ProductSuggestType) => {
    let productExists = productsInOrder.find(
      (product) => product.id === item.id
    );
    console.log(productExists);
    if (productExists) {
      const updatedProducts = productsInOrder.map((product) =>
        product.id === item.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setProductsInOrder(updatedProducts);
    } else {
      setProductsInOrder([...productsInOrder, { ...item, quantity: 1 }]);
    }
  };

  return (
    <Layout>
      <Header
        style={{
          background: "#1890ff",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          placeholder="Tìm hàng hóa (F3)"
          onSearch={onSearch}
          style={{ width: 400 }}
        />
      </Header>

      <Layout>
        <Content style={{ padding: "20px" }}>
          <Row gutter={16}>
            <Col span={16}>
              <List
                itemLayout="horizontal"
                dataSource={productsInOrder}
                renderItem={(item) => {
                  const totalPrice = item.quantity * item.price;
                  return (
                    <List.Item>
                      <Row style={{ width: "100%" }} align="middle">
                        {/* Left Section: Delete Icon, Product ID, Name, Quantity Control */}
                        <Col span={16}>
                          <Space>
                            <Button
                              icon={<DeleteOutlined />}
                              onClick={() => removeProduct(item.id)}
                              type="link"
                            />
                            <Text>{item.id}</Text>
                            <Text>{item.name}</Text>
                          </Space>
                        </Col>

                        {/* Right Section: Price, Total Price, Quantity Controls */}
                        <Col span={8} style={{ textAlign: "right" }}>
                          <Space>
                            <Text>{item.price.toLocaleString()} đ</Text>
                            <InputNumber
                              min={1}
                              value={item.quantity}
                              onChange={(value) =>
                                updateQuantity(item.id, value ?? 0)
                              }
                            />
                            <Text strong>{totalPrice.toLocaleString()} đ</Text>
                            <Button
                              icon={<PlusOutlined />}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              type="link"
                            />
                            <Button icon={<MoreOutlined />} type="link" />
                          </Space>
                        </Col>
                      </Row>
                    </List.Item>
                  );
                }}
              />
              <Divider />
              <Row justify="space-between" align="middle">
                <Text strong>Amount:</Text>
                <Text strong>{getTotalPrice().toLocaleString()} đ</Text>
              </Row>
              <Button type="primary" style={{ marginTop: "10px" }}>
                Checkout
              </Button>
            </Col>

            <Col span={8}>
              <ProductSuggest handleOnClink={addProductToOrder} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TransactionOrder;
