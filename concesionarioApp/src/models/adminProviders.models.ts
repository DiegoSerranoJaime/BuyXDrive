export interface AdminProvider {
  id: number,
  name: string,
  phoneNumber: string,
  email: string,
  address: string,
  active: boolean
};

export interface ProviderForm {
  name: string,
  phone_number: string,
  email: string,
  address: string,
};
