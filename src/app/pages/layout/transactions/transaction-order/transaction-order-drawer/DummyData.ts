export interface ProductSuggestType {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const dummyDatas: ProductSuggestType[] = [
  {
    id: "SP000001",
    name: "Mỹ phẩm Ohui The First tái sinh cao cấp",
    price: 750000,
    image: "link_to_image",
  },
  {
    id: "SP000007",
    name: "Set mỹ phẩm Whoo tái sinh da cao cấp",
    price: 650000,
    image: "link_to_image",
  },
  {
    id: "SP000002",
    name: "Set mỹ phẩm Whoo dưỡng trắng da",
    price: 500000,
    image: "link_to_image",
  },
  {
    id: "SP000003",
    name: "Bộ mỹ phẩm Clinique Men",
    price: 2079000,
    image: "link_to_image",
  },
  {
    id: "SP000004",
    name: "Crest 3D White Intensive...",
    price: 1400000,
    image: "link_to_image",
  },
  {
    id: "SP000005",
    name: "Miếng dán trắng răng Crest 3D White...",
    price: 1200000,
    image: "link_to_image",
  },
  {
    id: "SP000006",
    name: "Miếng dán trắng răng Crest 3D White...",
    price: 550000,
    image: "link_to_image",
  },
  {
    id: "SP000008",
    name: "In Yang Cleanser Cream",
    price: 880000,
    image: "link_to_image",
  },
  {
    id: "SP000009",
    name: "Phấn lót trang điểm L’Oreal Paris",
    price: 410000,
    image: "link_to_image",
  },
  {
    id: "SP000010",
    name: "Soothing Protection Spray",
    price: 245000,
    image: "link_to_image",
  },
  {
    id: "SP000011",
    name: "Kem chống nắng Sundance Spf30",
    price: 296000,
    image: "link_to_image",
  },
  {
    id: "SP000012",
    name: "Nước hoa Incredible Me",
    price: 950000,
    image: "link_to_image",
  },
  {
    id: "SP000013",
    name: "Nước hoa Amarige",
    price: 1250000,
    image: "link_to_image",
  },
  {
    id: "SP000014",
    name: "Nước hoa Ange ou demon le secret",
    price: 2150000,
    image: "link_to_image",
  },
  {
    id: "SP000015",
    name: "Calvin Klein for her collection",
    price: 999000,
    image: "link_to_image",
  },
  {
    id: "SP000016",
    name: "Nước hoa nam BVLGari Pour",
    price: 860000,
    image: "link_to_image",
  },
  {
    id: "SP000017",
    name: "Mineral Kem nở ngực chai 35ml",
    price: 950000,
    image: "link_to_image",
  },
];

export const datas: ProductType[] = [
  {
    id: "SP000001",
    name: "Mỹ phẩm Ohui The First tái sinh cao cấp",
    price: 750000,
    quantity: 1,
    image: "link_to_image",
  },
  {
    id: "SP000007",
    name: "Set mỹ phẩm Whoo tái sinh da cao cấp",
    price: 650000,
    quantity: 2,
    image: "link_to_image",
  },
];

export interface ProductType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
