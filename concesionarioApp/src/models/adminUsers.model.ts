export interface AdminUser {
  id: number,
  name: string,
  email: string,
  gender: string,
  phoneNumber: string,
  active: boolean
};

export interface UserForm {
  name: string,
  surname: string,
  email: string,
  password: string,
  gender: string,
  address: string,
  phone_number: string
};
