import { PagesService } from './../../services/pages.service';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CongratesComponent } from '../congrates/congrates.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  err:string='';
  constructor(private _fb:FormBuilder,private _PagesService:PagesService) {

  }
  formData:any=this._fb.group({
    oldPassword:[''],
    newPassword:[''],
    confirmNewPassword:['']
  },
  {
    validators:ChangePasswordComponent.matchPassword
  }
)
  openCongrates(){
    this.modalService.open(CongratesComponent,{
      centered:true
    })
    this.activeModal.close()
  }
  changePass(){
    this._PagesService.changePassword(this.formData.value).subscribe({
      next:(res)=>{
        this.openCongrates()
        console.log(this.formData.value)
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
        this.err="Password must start with a capital letter and contain at least 8 characters"
      }
    })
  }
  static matchPassword(group: AbstractControl): ValidationErrors | null {
    // console.log('from matching', group.value)
    const pass = group.value.password;
    const rePass = group.value.confirmPassword;
    return pass === rePass ? null : { notMatching: true };
  }
}
