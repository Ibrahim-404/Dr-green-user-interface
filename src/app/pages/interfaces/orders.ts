export interface Orders {
    id: number
    paymentMethod: number
    status: number
    totalPrice: number
    userName: string
    descriptionStatus: string
    addressId: number
    createdDate: string
    isCurrentDateMoreThan7DaysAfter?:boolean
  }

export class OrdersModel implements Orders {
  paymentMethod: number=0
  status: number=0
  totalPrice: number=0
  userName: string=""
  descriptionStatus: string=""
  addressId: number=0
  createdDate: string=""
  id: number = 0
  isCurrentDateMoreThan7DaysAfter?:boolean=false
}
