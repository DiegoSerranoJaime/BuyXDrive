export interface Order {
  id: string,
  status: string,
  orderDate: string,
  deliveryDate: string
}

export interface OrderProduct {
  name: string,
  amount: number,
  price: number,
  discount: number
}
