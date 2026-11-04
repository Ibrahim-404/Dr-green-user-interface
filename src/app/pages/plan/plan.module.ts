import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from './components/plan/plan.component';
import { RouterModule, Routes } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { Step5Component } from './components/step5/step5.component';
import { Step6Component } from './components/step6/step6.component';
import { Step7Component } from './components/step7/step7.component';
import { RulerComponent } from './components/ruler/ruler.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'primeng/api';


const routes: Routes = [
  {path:'',component:PlanComponent},

];

@NgModule({
  declarations: [
    PlanComponent,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,
    RulerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    FormsModule,
    TranslateModule,
    SharedModule

  ],
  providers:[

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlanModule { }
