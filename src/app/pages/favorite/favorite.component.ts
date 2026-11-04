import { ToasterService } from './../../shared/services/toaster.service';
import { AuthService } from './../../features/services/auth.service';
import { Component } from '@angular/core';
import { PagesService } from '../services/pages.service';
import { Products, ProductsModel } from '../interfaces/products';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
	rating = 6;
  favProducts:Products[]|[]=[new ProductsModel()]
  constructor(private _PagesService:PagesService,private _AuthService:AuthService,private toastService:ToasterService) {
    this.getFavProducts()
  }
  showToast(message:string) {
    this.toastService.show(`Item ${message} successfully`, {


      classname: 'bg-success text-light',
    });
  }
  getFavProducts(){
    this._PagesService.getAllProducts().subscribe({
      next:(res)=>{
        // this.favProducts=res.data
        this.favProducts = res.data.filter((item:Products)=>{
          return item.isFavorite==true
        })
      }
    })
  }
  addToCard(item:Products){
    let x={
      quantity: 1,
      productId: item.id,
      userId: this._AuthService.userData.value.nameid
    }
    this._PagesService.postProductToCard(x).subscribe({
      next:(res)=>{
        this.showToast('added');

        console.log(res)
      }
    })
  }
  removeItemFromFav(item:Products){
    let x={
      userId: this._AuthService.userData.value.nameid,
      productId: item.id
    }
    this._PagesService.postToggleProductInFavorite(x).subscribe({
      next:(res)=>{
       this.getFavProducts()
       this.showToast('removed')
      }
    })
  }
}
