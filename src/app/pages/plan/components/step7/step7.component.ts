import { PlanService } from './../../services/plan.service';
import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Step6Component } from '../step6/step6.component';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrl: './step7.component.scss'
})
export class Step7Component {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  today:Date = new Date(); // Current date
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  data:any=0
  constructor(public _PlanService:PlanService){
    _PlanService.planResult.subscribe(res=>{
      this.data=Math.floor(res)
    })
  }
  addMonthToDate(date:Date){
   let newDate:Date=new Date()
   let currentMonth = newDate.getMonth();
   newDate.setMonth(currentMonth + 1);
   if (newDate.getDate() !== date.getDate()) {
    newDate.setDate(0); // This sets the date to the last day of the previous month
  }
  return newDate;
  }

}
