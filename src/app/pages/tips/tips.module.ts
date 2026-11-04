import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipsDetailsComponent } from './components/tips-details/tips-details.component';
import { Routes, RouterModule } from '@angular/router';
import { AllTipsComponent } from './components/children/all-tips/all-tips.component';
import { NutritionComponent } from './components/children/nutrition/nutrition.component';
import { WorkoutsComponent } from './components/children/workouts/workouts.component';
import { SharedModule } from '../../shared/shared.module';
import { TipsComponent } from './components/tips/tips.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: TipsComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllTipsComponent },
      { path: 'nutrition', component: NutritionComponent },
      { path: 'workouts', component: WorkoutsComponent },
    ],
  },
  { path: 'details/:id', component: TipsDetailsComponent },
];
@NgModule({
  declarations: [
    TipsDetailsComponent,
    TipsComponent,

    AllTipsComponent,
    NutritionComponent,
    WorkoutsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
  ],
})
export class TipsModule {}
