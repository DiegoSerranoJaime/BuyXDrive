export interface AdminProviderPorduct {
    id: number,
    name: string,
    price: number,
    amount: number,
    order_date: string,
    delivery_date: string,
    status: string
};
  
export interface ProviderPorductForm {
    product_id: number,
    price: number,
    amount: number,
};
