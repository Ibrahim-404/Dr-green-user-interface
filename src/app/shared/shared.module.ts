import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { LimitToPipePipe } from '../pipes/limit-to-pipe.pipe';
import { DefaultImageDirective } from './directives/default-image.directive';
import { SliderDirective } from './directives/slider.directive';
import { CardComponent } from './card/card.component';
import { RatingComponent } from './rating/rating.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MealComponent } from './meal/meal.component';
import { ToasterComponent } from './toaster/toaster.component';
import { SupplementsComponent } from './supplements/supplements.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { TranslateModule } from '@ngx-translate/core';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { PackageCardComponent } from './package-card/package-card.component';

@NgModule({
  declarations: [LimitToPipePipe,DefaultImageDirective, SliderDirective,
     CardComponent, RatingComponent, LoaderComponent, MealComponent,
     ToasterComponent,
     SupplementsComponent,
     OnlyNumbersDirective,
     WhatsappComponent,
     PackageCardComponent ],
  imports: [CommonModule,NgbModule,RouterModule,NgbToastModule,TranslateModule],
  providers: [provideHttpClient(withInterceptors([authInterceptor])), NgbActiveModal],
  exports: [FormsModule,LimitToPipePipe,DefaultImageDirective,
    SliderDirective,CardComponent,RatingComponent,
    LoaderComponent,MealComponent,ToasterComponent,
    SupplementsComponent,OnlyNumbersDirective,WhatsappComponent

  ],
})
export class SharedModule {}
