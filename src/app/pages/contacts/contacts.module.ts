import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';



const routes:Routes=[
  {path:'',redirectTo:'contacts',pathMatch:'full'},
  {path:'contacts',component:ContactUsComponent},
];
@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ContactsModule {
  constructor() { }
}
