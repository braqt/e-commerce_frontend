export interface Product {
  _id: string;
  name: string;
  description: string;
  imagesUrl: string[];
  category: string;
  priceInCents: number;
  discountPercentage: number;
  quantity: number;
  finalPriceInCents: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetProductsResponse {
  products: Product[];
  pageNumberLimit: number;
}
