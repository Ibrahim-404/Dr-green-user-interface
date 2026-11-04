import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'',loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
{path:'auth',loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)},
  // {path:'about',component:AboutComponent},
  // {path:'tips',component:TipsComponent},
  // {path:'*',component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
