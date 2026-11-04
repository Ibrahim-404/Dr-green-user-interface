import { SharedService } from './../../shared/services/shared.service';
import { PagesService } from './../services/pages.service';
import { Component } from '@angular/core';

import { UserOrders, UserOrdersModel } from '../interfaces/user-orders';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  allOrders:UserOrders[]=[];
  basePath: string = environment.baseURL;


  orderDate:Date|null=null
  constructor(private _PagesService:PagesService,private _SharedService:SharedService) {
    this.getAllOrders()
  }
	rating = 6;
  getAllOrders(){

    this._PagesService.getOrdersForTheUser().subscribe({
      next:res=>{
        console.log(res)
        this.allOrders=res.data


      }
    })
  }
}
