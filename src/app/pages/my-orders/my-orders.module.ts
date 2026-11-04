import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '../../shared/guards/auth-guard.guard';

const routes: Routes = [
  {path:'',component:MyOrdersComponent ,canActivate:[AuthGuard]},

];

@NgModule({
  declarations: [
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgbRatingModule,
    TranslateModule
  ],

})
export class MyOrdersModule { }
