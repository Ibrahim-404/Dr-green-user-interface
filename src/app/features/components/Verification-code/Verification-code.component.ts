import { Component, inject, signal, Signal } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { NewPasswordComponent } from '../new-password/new-password.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-Verification-code',
  templateUrl: './Verification-code.component.html',
  styleUrl: './Verification-code.component.scss',
})
export class VerificationCodeComponent {
  formData: FormGroup<{
    form1: FormControl<string | null>;
    form2: FormControl<string | null>;
    form3: FormControl<string | null>;
    form4: FormControl<string | null>;
  }>;
  finalForm: FormGroup<{
    code:FormControl<string | null>
  }>;
  private modalService = inject(NgbModal);
  public activeModal = inject(NgbActiveModal);
  finalValue:string = '';
  resendStatus=signal('')
  invalidCode=signal('')
  formCtrl1 = this.fb.control('', [Validators.required]);
  formCtrl2 = this.fb.control('', [Validators.required]);
  formCtrl3 = this.fb.control('', [Validators.required]);
  formCtrl4 = this.fb.control('', [Validators.required]);

  constructor(private fb: FormBuilder, private _Auth: AuthService, modalService :NgbModal,private activalModal: NgbActiveModal) {
    this.formData = this.fb.group({
      form1: this.formCtrl1,
      form2: this.formCtrl2,
      form3: this.formCtrl3,
      form4: this.formCtrl4,
    });
    this.finalForm=this.fb.group({
      code:this.fb.control('',[Validators.required])
    })
  }
  moveFocus(event: KeyboardEvent, currentIndex: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1) {
      const nextInput = document.querySelector(
        `input[formControlName="form${currentIndex + 1}"]`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
  resendCode(){
    console.log(this._Auth.forgetPassword)
    this._Auth.postForgetPassword(this._Auth.forgetPassword).subscribe({
      next:(res)=>{
        // console.log(res)
        this.resendStatus.set('Code resent successfully')
        setTimeout(()=>{
          this.resendStatus.set('')

        },2000)
      },
      error:(err)=>{
        // console.log(err)
      }
    })
  }

  vertifyCode() {
    this.finalValue=Object.values(this.formData.controls).map((control) => control.value).join('')
    this.finalForm.controls['code'].setValue(this.finalValue)

    // console.log('final', this.finalForm.value);
    this._Auth.postVerificationCode(this.finalForm.value).subscribe({
      next: (res) => {
        // console.log('res', res);
        this._Auth.verifyCode = this.finalForm.value;
        this.modalService.open(NewPasswordComponent, {
          centered: true,
          size: 'lg',
        })

        this.activeModal.close();
      },
      error: (err) => {
        // console.log('error ', err);
        this.invalidCode.set('Invalid code')
        setTimeout(() => {
          this.invalidCode.set('')

        }, 2000);
      },
      complete: () => {
        // console.log('complete');
      },
    });
  }
  openForget() {
    const forget = this.modalService.open(ForgetPasswordComponent, {
      centered: true,
      size: 'lg',
    });
    this.activeModal.close();
  }
  openNewPassword() {
    const newPassword = this.modalService.open(NewPasswordComponent, {
      centered: true,
      size: 'lg',
    });
    this.activeModal.close();
  }
}
