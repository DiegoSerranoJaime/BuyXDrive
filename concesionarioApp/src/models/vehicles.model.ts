export interface Vehicle {
  id: number,
  price: number,
  amount: number,
  discount: number,
  name: string,
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

export interface VehicleType {
  id: number,
  name: string
};

export interface VehicleCard {
  id: number,
  price: string,
  amount: number,
  discount: number,
  image: string,
  type: string,
  name: string,
  doors: number,
  seating: number,
  cv: number,
  val: number,
  bname?: string
};
