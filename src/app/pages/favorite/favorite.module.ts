import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {path:'',component:FavoriteComponent},

];

@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    NgbRatingModule,
    NgbModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class FavoriteModule { }
