import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyplanComponent } from './myplan/myplan.component';
import { AddfoodComponent } from './addfood/addfood.component';
import { AddmealComponent } from './addmeal/addmeal.component';
import { WeightTodayComponent } from './weight-today/weight-today.component';
import { TrainingVideoComponent } from './training-video/training-video.component';
import { AddDietarySupplementsComponent } from './add-dietary-supplements/add-dietary-supplements.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '../../../shared/guards/auth-guard.guard';
import { SharedModule } from "../../../shared/shared.module";
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { NgbActiveModal, NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'primeng/chart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes:Routes=[

  {path:'',component:MyplanComponent,canActivate:[AuthGuard]},
]

@NgModule({
  declarations: [
    MyplanComponent,
    AddfoodComponent,
    AddmealComponent,
    WeightTodayComponent,
    TrainingVideoComponent,
    AddDietarySupplementsComponent,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CalendarModule,
    FormsModule,
    CarouselModule,
    TranslateModule,
    SharedModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbProgressbarModule,
    MatProgressBarModule,
    ChartModule
],providers:[
  NgbActiveModal
]
})
export class MyplanModule { }
