export interface Order {
    id: number
    number: string
    paymentMethod: number
    status: number
    totalPrice: number
    userId: number
    userName: string
    userEmail: string
    userPhoneNumber: string
    descriptionStatus: string
    addressId: number
    createdDate: string
    invoice: Invoice
    orderItems: OrderItem[]
    address: Address
    isCurrentDateMoreThan7DaysAfter?:boolean
}

  export interface Invoice {
    id: number
    amount: number
    number: string
    createdDate: string
    orderStatus: number
    clientName: string
  }

  export interface OrderItem {
    id: number
    quantity: number
    productName: string
    productPrice: number
    productImages: any[]
    totalPrice: number
  }

  export interface Address {
    id: number
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
export class OrderModel implements Order {
  id: number = 0
  number: string = ''
  paymentMethod: number = 0
  status: number = 0
  totalPrice: number = 0
  userId: number = 0
  userName: string = ''
  userEmail: string = ''
  userPhoneNumber: string = ''
  descriptionStatus: string = ''
  addressId: number = 0
  createdDate: string = ''
  invoice: Invoice = new InvoiceModel()
  orderItems: OrderItem[] = []
  address: Address = new AddressModel()
  isCurrentDateMoreThan7DaysAfter?:boolean
}
export class InvoiceModel implements Invoice {
  id: number=0
  amount: number=0
  number: string=''
  createdDate: string=''
  orderStatus: number=0
  clientName: string=''
}
export class OrderItemModel implements OrderItem {
  id: number=0
  quantity: number=0
  productName: string=''
  productPrice: number=0
  productImages: any[]=[]
  totalPrice: number=0
}
export class AddressModel implements Address {
  id: number=0
  latitude: number=0
  longitude: number=0
  addressLocation: string=''
  detail: string=''
  phoneNumber: string=''
  fName: string=''
  lName: string=''
  location: string=''
  isDefault: boolean=false
  customerId: number=0
}
