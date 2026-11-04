import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgbActiveModal, NgbModule, NgbPaginationModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { AddToCardComponent } from './add-to-card/add-to-card.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AllProductsComponent } from './all-products/all-products.component';
const routes: Routes = [
  {path: '',component:AllProductsComponent},
  { path: 'category/:id', component: ProductsComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
];
@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent, AddToCardComponent, AllProductsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CarouselModule,
    FormsModule,
    TranslateModule,
    NgbModule,
    NgbProgressbarModule,
    NgbPaginationModule
  ],
  providers: [
    NgbActiveModal,  ],
})
export class ProductsModule {}
