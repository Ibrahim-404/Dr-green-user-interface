import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AuthGuard } from '../../shared/guards/auth-guard.guard';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdditAddressComponent } from './eddit-address/eddit-address.component';

const routes: Routes = [
{path:'',component:CartComponent,canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [
    AddAddressComponent,
    AddressDetailsComponent,
    EdditAddressComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers:[
    NgbActiveModal
  ]
})
export class CartModule { }
