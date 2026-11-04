export interface MyAddress {
  id:number
  latitude: number
  longitude: number
  addressLocation: string
  detail: string
  phoneNumber: string
  fName: string
  lName: string
  location: string
  isDefault: boolean
  customerId: number
}

export class MyAddressModel implements MyAddress {
  id:number=0
  latitude: number=0;
  longitude: number=0;
  addressLocation: string='';
  detail: string='';
  phoneNumber: string='';
  fName: string='';
  lName: string='';
  location: string='';
  isDefault: boolean=false;
  customerId: number=0;
}
