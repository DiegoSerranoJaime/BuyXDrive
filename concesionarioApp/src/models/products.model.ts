export interface cart_data {
  id: number,
  amount: number
};

export interface cart_product {
  bname: string,
  mname: string,
  image: string,
  price: number,
  discount: number
  id?: number,
  amount?: number,
};
