import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeNumberComponent } from './change-number/change-number.component';
import { ConfirmNumberComponent } from './confirm-number/confirm-number.component';
import { CongratesComponent } from './congrates/congrates.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbActiveModal, NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '../../shared/guards/auth-guard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes:Routes=[
  {path:'',redirectTo:'profile',pathMatch:'full'},
  {path:'profile',component:ProfileComponent ,canActivate:[AuthGuard]},
  {path:'myplan',loadChildren:() => import('./myplan/myplan.module').then(m => m.MyplanModule)},
]
@NgModule({
  declarations: [
    ChangePasswordComponent,
    ChangeNumberComponent,
    ConfirmNumberComponent,
    CongratesComponent,
    ProfileComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule

  ],providers:[
    NgbActiveModal
  ]
})
export class ProfileModule { }
