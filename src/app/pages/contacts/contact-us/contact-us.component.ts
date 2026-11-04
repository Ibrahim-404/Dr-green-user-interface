import { PagesService } from './../../services/pages.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
export interface contactForm {
  name:FormControl<string | null>,
  email:FormControl<string | null>,
  phoneNumber:FormControl<string | null>,
  message:FormControl<string | null>
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  contactForm:FormGroup<contactForm>
  nameCtrl=this.fb.control('',Validators.required)
  emailCtrl=this.fb.control('',Validators.required)
  phoneNumberCtrl=this.fb.control('',Validators.required)
  messageCtrl=this.fb.control('',Validators.required)
  constructor(private fb:FormBuilder,private _PagesService:PagesService) {
    this.contactForm=fb.group({
      name:this.nameCtrl,
      email:this.emailCtrl,
      phoneNumber:this.phoneNumberCtrl,
      message:this.messageCtrl
    })
    console.log(new Date('9-10-2024').toLocaleDateString());
  }


  onSubmit(){
    this._PagesService.contactUs(this.contactForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.contactForm.reset()
      },
      error:(err)=>{
        console.log(err)
      }
    })
    console.log(this.contactForm.value)
  }

}
