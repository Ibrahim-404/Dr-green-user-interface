import { PlanService } from './../../services/plan.service';
import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Step4Component } from '../step4/step4.component';
import { Step2Component } from '../step2/step2.component';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  weight:number|null=null;
  constructor(private _PlanService:PlanService){

  }
  openStep4() {
    const modalRef = this.modalService.open(Step4Component, {
      centered: true,
      size: 'lg',
    }
  );
  this.activeModal.close()
  this._PlanService.userPlan.weight=this.weight;
  // console.log(this._PlanService.userPlan)
}
  openStep2() {
    const modalRef = this.modalService.open(Step2Component, {
      centered: true,
      size: 'lg',
    }
  );
  this.activeModal.close()
}
}
