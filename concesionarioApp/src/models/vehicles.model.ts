export interface vehicle {
  id: number,
  price: number,
  amount: number,
  discount: number,
  bname: string,
  mname: string,
  description: string,
  cv: number,
  traction: string,
  transmission: string,
  status: string,
  km: number,
  fuel: string,
  consumption: string,
  doors: number,
  weight: number,
  seating: number,
  inner_materials: string,
  type: string,
  cant: number,
  val: number
};

export interface vehicle_type {
  id: number,
  name: string
};

export interface vehicle_card {
  id: number,
  price: string,
  amount: number,
  discount: number,
  image: string,
  type: string,
  bname: string,
  mname: string,
  doors: number,
  seating: number,
  cv: number,
};
