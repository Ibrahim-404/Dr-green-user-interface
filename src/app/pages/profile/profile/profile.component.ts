import { PagesService } from './../../services/pages.service';
import { Component,inject, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangeNumberComponent } from '../change-number/change-number.component';
import { PlanComponent } from '../../plan/components/plan/plan.component';
export interface user {
  id: number
  email: string
  phoneNumber: string
  lastLogin: string
  userType: number
  name: string
  password: any
  addresses: any[]
}
export class userModel implements user {
  id: number=0
  email: string=''
  phoneNumber: string=''
  lastLogin: string=''
  userType: number=0
  name: string=''
  password: any=''
  addresses: any[]=[]
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userInfo:user=new userModel()
  havePlan:boolean=false

  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  constructor(private _PagesService:PagesService) {
    this.getUserPlan()
  }
  ngOnInit(): void {
this.getUserData()
  }
  openChangePassword(){
    this.modalService.open(ChangePasswordComponent,{
      centered:true,

    })
    this.activeModal.close()
  }
  openChangePhone(){
    this.modalService.open(ChangeNumberComponent,{
      centered:true,

    })
    this.activeModal.close()
  }

  openPlan(){
    this.modalService.open(PlanComponent,{
      centered:true,
    })
  }
  getUserData(){
      this._PagesService.getUser().subscribe({
        next:(res)=>{
          // console.log(res)
          this.userInfo=res
        },
        error:(err)=>{
          // console.log(err)
        }
      })
  }
   getUserPlan(){
    this._PagesService.listUserPlans(null).subscribe({
      next:(res)=>{
        if(res.data.length>0){
          this.havePlan=true
        }else{
           this.havePlan=false
        }
      }
    })

  }
}
