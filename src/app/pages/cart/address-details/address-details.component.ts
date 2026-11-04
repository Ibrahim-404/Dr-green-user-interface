import { Component } from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { MyAddress, MyAddressModel } from '../../interfaces/my-address';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.scss'
})
export class AddressDetailsComponent {
  addressData:MyAddress[]=[new MyAddressModel()]
  constructor(private _PagesService:PagesService,  activalModal: NgbActiveModal,
    private modalService: NgbModal,) {
    this.getAddresses  ()
  }


  getAddresses(){
    this._PagesService.getAddressesForUser().subscribe({
      next:(res)=>{
        this.addressData=res.data
      }
    })
  }
  addNewAddress(){
    this.modalService.open(AddAddressComponent,{
      centered: true,
      size: 'lg',
    })
  }
  editAddress(item:MyAddress){
    const modalRef = this.modalService.open(AddAddressComponent,{
      centered: true,
      size: 'lg',
    })
    modalRef.componentInstance.addressData=item
  }

}
