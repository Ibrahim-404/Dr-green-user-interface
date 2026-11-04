import { PlanService } from './../../services/plan.service';
import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Step4Component } from '../step4/step4.component';
import { Step6Component } from '../step6/step6.component';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrl: './step5.component.scss'
})
export class Step5Component {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  selectedValue = ''
  constructor(private _PlanService:PlanService){}
  openStep6() {
    const modalRef = this.modalService.open(Step6Component, {
      centered: true,
      size: 'lg',
    }
  );
  this.activeModal.close()
}
  openStep4() {
    const modalRef = this.modalService.open(Step4Component, {
      centered: true,
      size: 'lg',
    }
  );
  this.activeModal.close()
}

onItemChange(data: any) {
  this.selectedValue = data.target.value;
  // console.log(" Value is : ", data.target.value);
  this._PlanService.userPlan.fitnessLevel=parseInt(data.target.value)
  // console.log(this._PlanService.userPlan)
  return this.selectedValue;

}

}
