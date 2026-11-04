import { Component,inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Step2Component } from '../step2/step2.component';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {
  @Input()calculateCalories=false
  gender:any=null;
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  constructor(private _PlanService:PlanService){

  }
  openStep2() {
    const modalRef = this.modalService.open(Step2Component, {
      centered: true,
      size: 'lg',
    }
  );

  this.activeModal.close()
  // console.log(this.gender)
  if(this.gender!==null){

    this._PlanService.userPlan.gender= parseInt(this.gender)
  }
  this._PlanService.calculateCalories=this.calculateCalories
  // console.log(this._PlanService.userPlan)
}
}
