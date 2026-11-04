import { VerificationCodeComponent } from '../Verification-code/Verification-code.component';
import { Component, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);
  toEmailCtrl = this.fb.control('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_-]{1,}@gmail.com$'),
  ]);
  toEmailForm: FormGroup<{
    toEmail: FormControl<string | null>;
  }>;
  mailError: string = '';
  constructor(private fb: FormBuilder, private _auth: AuthService) {
    this.toEmailForm = fb.group({
      toEmail: this.toEmailCtrl,
    });
  }
  forgetPassword(data: FormGroup) {
    // console.log(data.value);
    this._auth.forgetPassword=data.value
    this._auth.postForgetPassword(data.value).subscribe({
      next: (res) => {
        console.log('ressss', res);
        this.openVerification();

        this.activeModal.close();
      },
      error: (err) => {
        this.mailError = err.error.message;
        // console.log('from error', this.mailError);
        // console.log('err', err.status);
        if (err.status == 404) {
          this.mailError = 'Email does not exist ';
        }
      },
      complete: () => {
        // console.log('completed');
      },
    });
  }
  openLogin() {
    const login = this.modalService.open(LoginComponent, {
      centered: true,
      size: 'lg',
    });
    this.activeModal.dismiss();
  }
  openVerification() {
    const Verification = this.modalService.open(VerificationCodeComponent, {
      centered: true,
      size: 'lg',
    });
    // this.activeModal.close();
  }
}
