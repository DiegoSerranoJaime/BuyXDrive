export interface CartData {
  id: number,
  amount: number
};

export interface CartProduct {
  name: string,
  image: string,
  price: number,
  discount: number
  id?: number,
  amount?: number,
};
