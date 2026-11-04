export interface NewAddress {
    latitude: number
    longitude: number
    addressLocation: string
    detail: string
    phoneNumber: string
    fName: string
    lName: string
    location: number
    isDefault: boolean
    customerId: number
  }
  export class NewAddressModel{
    latitude: number=0
    longitude: number=0
    addressLocation: string=''
    detail: string=''
    phoneNumber: string=''
    fName: string=''
    lName: string=''
    location: number=0
    isDefault: boolean=false
    customerId: number=0
  }


