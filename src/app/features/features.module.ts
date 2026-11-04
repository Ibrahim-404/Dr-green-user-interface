import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';

import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerificationCodeComponent } from './components/Verification-code/Verification-code.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';


const routes: Routes = [


];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    VerificationCodeComponent,
    NewPasswordComponent,
    PasswordChangedComponent,
    RegisterSuccessComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule, NgbAlertModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule

  ],exports:[
    LoginComponent,
    RegisterComponent,
    RouterModule,
    VerificationCodeComponent

  ],providers:[
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class FeaturesModule { }
