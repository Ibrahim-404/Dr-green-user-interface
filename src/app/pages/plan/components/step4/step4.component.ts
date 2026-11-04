import { PlanService } from './../../services/plan.service';
import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Step5Component } from '../step5/step5.component';
import { Step3Component } from '../step3/step3.component';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.scss'
})
export class Step4Component {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  height:number|null=null
  constructor(private _PlanService:PlanService){

  }
  openStep5() {
    const modalRef = this.modalService.open(Step5Component, {
      centered: true,
      size: 'lg',
    }
  );
  this.activeModal.close()
  this._PlanService.userPlan.height=this.height
  // console.log(this._PlanService.userPlan)
}
  openStep3() {
    const modalRef = this.modalService.open(Step3Component, {
      centered: true,
      size: 'lg',
    }
  );
  this.activeModal.close()
}
}
