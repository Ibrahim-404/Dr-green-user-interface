export interface CartItem {
  createdDate: Date|string;
  id: number;
  imagesURL: string|string[];
  orderItemsQuantity: number;
  productId: number;
  productName: string;
  stockStatus: number;
  totalPrice: number;
  overAllRating:number
  price:number
}

export class CartItemModel implements CartItem{
  createdDate='';
  id: number=-1;
  imagesURL: string|string[]=[];
  orderItemsQuantity: number=0;
  productId: number=0;
  productName: string='';
  stockStatus: number=0;
  totalPrice: number=0;
  overAllRating:number=0;
  price:number=0
}
