import { AuthService } from './../../services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerificationCodeComponent } from '../Verification-code/Verification-code.component';
import { PasswordChangedComponent } from '../password-changed/password-changed.component';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
	activeModal = inject(NgbActiveModal);
	private modalService = inject(NgbModal);

  passwordCtrl = this._fb.control('',[Validators.required])
  rePasswordCtrl = this._fb.control('',[Validators.required])
  newPasswordForm:FormGroup<{
    password:FormControl<string | null>,
    rePassword:FormControl<string | null>,
    code:any
  }>
  constructor(private _fb:FormBuilder,private _AuthService:AuthService) {
    this.newPasswordForm = this._fb.group({
      password: this.passwordCtrl,
      rePassword: this.rePasswordCtrl,
      code:_AuthService.verifyCode.code
    },{validators:NewPasswordComponent.passwordMatch})
  }

  confirmNewPassword(){
    console.log(this.newPasswordForm.value)
    this._AuthService.postChangePassWithCode(this.newPasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.openPasswordChanged()
      },error:(err)=>{
        console.log(err)
      }
    })

  }

  static passwordMatch(group:AbstractControl):ValidationErrors | null{

    const pass = group.value.password;
    const confirmPass = group.value.rePassword;
    return pass === confirmPass ? null : { notMatching: true }
  }



  openVerification(){
    this.modalService.open(VerificationCodeComponent,{
      centered:true,
      size:'lg'
    })
    this.activeModal.close()
  }
  openPasswordChanged(){
    this.modalService.open(PasswordChangedComponent,{
      centered:true,
      size:'lg'
    })
    this.activeModal.close()
  }

}
