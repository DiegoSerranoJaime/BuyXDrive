export interface cart_data {
  id: number,
  amount: number
};

export interface cart_product {
  name: string,
  image: string,
  price: number,
  discount: number
  id?: number,
  amount?: number,
};
