export interface AdminEmployer {
  id: number,
  name: string,
  email: string,
  gender: string,
  phoneNumber: string,
  type: string,
  active: boolean
};

export interface EmployerForm {
  name: string,
  surname: string,
  email: string,
  password: string,
  gender: string,
  address: string,
  phone_number: string
  user_type: number
};
