import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyAddressesComponent } from './my-addresses.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '../../shared/guards/auth-guard.guard';

const routes:Routes=[
  {path:'',component:MyAddressesComponent, canActivate:[AuthGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class MyAddressesModule { }
