import { AuthService } from './../../features/services/auth.service';
import { PagesService } from './../services/pages.service';
import { Component, inject } from '@angular/core';
import { MyAddress, MyAddressModel } from '../interfaces/my-address';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAddressComponent } from '../cart/add-address/add-address.component';


@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrl: './my-addresses.component.scss'
})
export class MyAddressesComponent {
    addressesData:MyAddress[]=[new MyAddressModel()]


    constructor(private _PagesService:PagesService,private _AuthService:AuthService,) {
      this.getAddresses()
    }
    private modalService = inject(NgbModal);
    activeModal = inject(NgbActiveModal);
    getAddresses(){
      this._PagesService.getAddressesForUser().subscribe({
        next:(res)=>{
          this.addressesData=res.data
        }
      })
    }
    deleteAddress(id:number){
      this._PagesService.deleteAddress(id).subscribe({
        next:(res)=>{
          this.getAddresses()
        }
      })
    }
    setAddressDefault(id:number){
      let x={
        id:id,
        customerId:this._AuthService.userData.value.nameid
      }
      // console.log(x)
      this._PagesService.setAddressDefault(x).subscribe({
        next:(res)=>{
          this.getAddresses()
        }
      })
    }
    openAddNewAddress(){
      const activalModal = this.modalService.open(AddAddressComponent, {
        centered: true,
        size: 'lg',
      });
    }
}
