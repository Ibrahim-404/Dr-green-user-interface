import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { CartComponent } from './cart/cart.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '../shared/guards/auth-guard.guard';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'tips',loadChildren:() => import('./tips/tips.module').then(m => m.TipsModule)},
  {path:'my-orders',loadChildren:() => import('./my-orders/my-orders.module').then(m => m.MyOrdersModule)},
  {path:'favorite',loadChildren:() => import('./favorite/favorite.module').then(m => m.FavoriteModule)},
  {path:'plan',loadChildren:() => import('./plan/plan.module').then(m => m.PlanModule)},
  {path:'products',loadChildren:() => import('./products/products.module').then(m => m.ProductsModule)},
  {path:'contacts',loadChildren:() => import('./contacts/contacts.module').then(m => m.ContactsModule) ,},
  {path:'profile',loadChildren:() => import('./profile/profile.module').then(m => m.ProfileModule)},
  {path:'address',loadChildren:() => import('./my-addresses/my-addresses.module').then(m => m.MyAddressesModule),canActivate:[AuthGuard]},
  {path:'cart',loadChildren:() => import('./cart/cart.module').then(m => m.CartModule)},
];
@NgModule({
  declarations: [AboutComponent,HomeComponent, MyAddressesComponent, CartComponent, ],
  imports: [
    CommonModule,
    NgbModule,
    CarouselModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers:[
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
