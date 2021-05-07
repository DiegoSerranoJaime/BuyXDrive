export interface order {
  id: string,
  status: string,
  orderDate: string,
  deliveryDate: string
}

export interface orderProduct {
  bname: string,
  mname: string,
  amount: number,
  price: number,
  discount: number
}
