import { PagesService } from './../../../pages/services/pages.service';
import { Component, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { RegisterSuccessComponent } from '../register-success/register-success.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  emailCtrl = this.fb.control('', [Validators.required, Validators.email]);
  passwordCtrl = this.fb.control('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  authStatus: string = '';
  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _localStorage: LocalStorageService,
    private _PagesService: PagesService
  ) {
    this.loginForm = fb.group({
      email: this.emailCtrl,
      password: this.passwordCtrl,
    });
  }

  loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  login() {
    // console.log(this.loginForm.value);
    this._auth.postLogin(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.user) {
          this._auth.encodedToken.next(res.token);
          // console.log('success ', res);
          this._localStorage.setItem('userToken', JSON.stringify(res.token));
          this._auth.user=res.user;
          this.authStatus = '';
          this._auth.encodedToken.next(res.token);
          let decoded = jwtDecode(this._auth.encodedToken.value);
          this._auth.userData.next(decoded);
          this._auth.isLogin.next(true);
          window.location.reload();
          this._PagesService.listUserPlans(null).subscribe({
            next: (res) => {
              if (res.data.length==0) {
                const forgetPassword = this.modalService.open(RegisterSuccessComponent, {
                  centered: true,
                  size: 'lg',
                });
              }else{

              }
            }
          })
          this.activeModal.dismiss();

          }

      },
      error: (error) => {
        // console.log('errorrrrrrrrr', error);
        if (error.error.StatusCode == 400) {
          this.authStatus = 'Email or password is incorrect';
          // console.log(this.authStatus);
        } else if (error.error.statusCode == 404) {
          // console.log('user not found');
        }
      },
      complete: () => console.info('complete'),
    });
  }

  openSignUp() {
    const register = this.modalService.open(RegisterComponent, {
      centered: true,
      size: 'lg',
    });
    this.activeModal.close('close');
  }
  openForgetPassword() {
    const forgetPassword = this.modalService.open(ForgetPasswordComponent, {
      centered: true,
      size: 'lg',
    });
    this.activeModal.close('close');
  }
}
