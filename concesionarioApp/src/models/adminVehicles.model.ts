export interface AdminVehicle {
  id: number,
  price: number,
  amount: number,
  discount: number,
  type: string,
  val: number,
  bname: string,
  mname: string,
  active: boolean
}

export interface VehicleForm {
  model_id: number,
  type: number,
  price: number,
  amount: number,
  discount: number,
  cv: number,
  traction: string,
  transmission: string,
  km: number,
  fuel: string,
  consumption: string,
  doors: number,
  weight: number,
  seating: number,
  inner_materials: string,
  description: string
}
