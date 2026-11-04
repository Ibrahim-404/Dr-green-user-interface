// export interface UserOrders {
//   id: number
//   number: string
//   totalPrice: number
//   productName: any
//   overAllRating: any
//   paymentMethod: number
//   status: number
//   orderItemsQuantity: number
//   quantity: number
//   imagesURL: any
//   stockStatus: number
//   name: string
//   orderDate: string
//   isCurrentDateMoreThan7DaysAfter?:boolean
// }
export interface UserOrders {
  id: number
  number: string
  totalPrice: number
  paymentMethod: number
  orderDate: string
  status: number
  orderItems: OrderItem[]
  orderItemsQuantity: number
}
export interface OrderItem {
  id: number
  quantity: number
  productName: string
  productPrice: number
  productImages: string[]
  totalPrice: number
}
export class UserOrdersModel implements UserOrders {
  id: number = 0;
  number: string = '';
  totalPrice: number = 0;
  paymentMethod: number = 0;
  orderDate: string = '';
  status: number = 0;
  orderItems: OrderItem[] = [];
  orderItemsQuantity: number = 0;
}

