import { PlanService } from './../../services/plan.service';
import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanComponent } from '../plan/plan.component';
import { Step3Component } from '../step3/step3.component';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  age:number|null=null
  constructor(private _PlanService:PlanService){}
  openPlan() {
    const modalRef = this.modalService.open(PlanComponent, {
      centered: true,
      size: 'lg',
    }
  );
  this.activeModal.close()
}
openStep3(){
  const modalRef = this.modalService.open(Step3Component, {
    centered: true,
    size: 'lg',
  }
);
this.activeModal.close()
  this._PlanService.userPlan.age=this.age
  // console.log(this._PlanService.userPlan)
}
}
