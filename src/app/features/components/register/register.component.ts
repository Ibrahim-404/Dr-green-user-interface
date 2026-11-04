import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private modalService = inject(NgbModal);
	activeModal = inject(NgbActiveModal);
  nameCtrl=this.fb.control('',Validators.required)
  emailCtrl=this.fb.control('',Validators.required)
  passwordCtrl=this.fb.control('',Validators.required)
  confirmPasswordCtrl=this.fb.control('',Validators.required)
  phoneNumberCtrl=this.fb.control('',Validators.required)

  registerForm:FormGroup<(any
  )>;
  constructor(private fb:FormBuilder,private _auth:AuthService){
    this.registerForm=fb.group({
      name:this.nameCtrl,
      email:this.emailCtrl,
      password:this.passwordCtrl,
      confirmPassword:this.confirmPasswordCtrl,
      phoneNumber:this.phoneNumberCtrl,

    },{
      validators:RegisterComponent.matchPassword
    })
  }
  open(){
    const modalRef = this.modalService.open(LoginComponent, {
      centered: true,
      size: 'lg',
    })
    this.activeModal.close('close')

  }
  static matchPassword(group: AbstractControl): ValidationErrors | null {
    // console.log('from matching', group.value)
    const pass = group.value.password;
    const rePass = group.value.confirmPassword;
    return pass === rePass ? null : { notMatching: true };
  }

  register(data:FormGroup){
    this._auth.postRegister(data.value).subscribe((res)=>{
      // console.log(res)
      if(res.StatusCode==200){
        this.modalService.open(LoginComponent,{
          centered:true
        })
        this.activeModal.dismiss()
      }
    })
    // console.log(data.value)
  }

}
