import { ToasterService } from './../../shared/services/toaster.service';
import { AuthService } from './../../features/services/auth.service';
import { PagesService } from './../services/pages.service';
import { Component ,inject} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAddressComponent } from './add-address/add-address.component';
import { environment } from '../../../environments/environment.development';
import { CartItem, CartItemModel } from '../interfaces/cart-item';
import { AddressDetailsComponent } from './address-details/address-details.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  baseUrl: string = environment.baseURL;
  quantity:number[]=[]
	activeModal = inject(NgbActiveModal);
	modalService = inject(NgbModal);
  cart:CartItem[]=[new CartItemModel()]
  totalPrice:number=0
  constructor(private _PagesService:PagesService,private _AuthService:AuthService,private _ToasterService:ToasterService) {

    this.getAllCartItems()
  }
  getAllCartItems(){

   this._PagesService.getAllUserCartItems().subscribe({
     next:(res)=>{
        this.cart=res.data
        // console.log(this.cart)
        this.totalPrice=this.cart.reduce((acc,curr)=>acc+(curr.totalPrice*curr.orderItemsQuantity),0)
        for(let i of this.cart){
          this.quantity.push(i.orderItemsQuantity)
        }
      }
    })
  }
  openAddressDetails() {
    const modalRef = this.modalService.open(AddressDetailsComponent, {
    centered: true,
    size: 'lg',
  });

}
increaseQuantity(i:number){

 this.quantity[i]+=1
  }
decreaseQuantity(i:number){
  if(this.quantity[i]>1){
    this.quantity[i]-=1
  }
  console.log(this.quantity)
  }
  updateQuantity(card:CartItem,i:number){
    let req={
      quantity: this.quantity[i],
      productId: card.productId      ,
      userId:Number(this._AuthService.userData.value?.nameid)
    }

    setTimeout(()=>{
      this._PagesService.postProductToCard(req).subscribe({
        next: (res) => {
          // console.log(req);
          // console.log(res);
          this.getAllCartItems()

        },
        error: (err) => {
          // console.log(err);
          // console.log(req);
        },
      })
    },1000)
  }
  removeItem(item:CartItem,i:number){
    this._PagesService.deleteItemByCartId(item.id).subscribe({
      next:(res)=>{
        // console.log(res)
        this.cart.splice(i,1)
        this._ToasterService.show( 'Item has been removed successfully');
        this.getAllCartItems()
      },
      error:(err)=>{
        this._ToasterService.show( 'Can not remove item now,Try again later');
      }
    })
  }
}

