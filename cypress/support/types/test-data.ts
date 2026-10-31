export interface Address {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export interface TestUser {
  name: string;
  email: string;
  password: string;
  title: 'Mr' | 'Mrs';
  birth: { day: string; month: string; year: string };
  address: Address;
}

export interface PaymentData {
  name: string;
  number: string;
  cvc: string;
  month: string;
  year: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
