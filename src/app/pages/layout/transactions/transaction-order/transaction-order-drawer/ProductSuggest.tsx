import { Input, Card, Pagination, Button, List, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { dummyDatas, ProductSuggestType, ProductType } from "./DummyData";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const { Search } = Input;
type Props = {
    handleOnClink: (item: ProductSuggestType) => void,
};

const ProductSuggest = (props: Props) => {
  const [products, setProducts] = useState(dummyDatas);

  const handleSearch = (value: string) => {
    console.log("Search:", value);
  };

  const [currentPage, setCurrentPage] = useState(1);

  // Pagination handler
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const createFakeData = () => {
    const updatedProducts: ProductSuggestType[] = [];

    dummyDatas.forEach((product: ProductSuggestType) => {
      let newProduct = { ...product, image: faker.image.url() };
      updatedProducts.push(newProduct);
    });

    setProducts(updatedProducts);
  };

  useEffect(() => {
    createFakeData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Bar */}
      <Search
        placeholder="Tìm khách hàng (F4)"
        enterButton={<SearchOutlined />}
        style={{ marginBottom: "20px", maxWidth: "400px" }}
        onSearch={handleSearch}
      />

      {/* Product List */}
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <Image alt={item.name} width={100} src={item.image} height={100} />
              } // Replace with product image URL
              onClick={() => props.handleOnClink(item)}
            >
              <Card.Meta
                title={item.name}
                description={`${item.price.toLocaleString()} đ`}
              />
            </Card>
          </List.Item>
        )}
      />

      {/* Pagination */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Pagination
          current={currentPage}
          total={products.length}
          pageSize={10}
          onChange={onPageChange}
        />
      </div>

      {/* Order Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button type="primary" size="large">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default ProductSuggest;
