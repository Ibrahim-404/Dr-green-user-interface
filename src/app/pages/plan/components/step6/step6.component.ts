import { AuthService } from './../../../../features/services/auth.service';
import { PlanService } from './../../services/plan.service';
import { Component, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Step7Component } from '../step7/step7.component';
import { Step5Component } from '../step5/step5.component';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrl: './step6.component.scss',
})
export class Step6Component {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  selectedValue = '';

  constructor(
    private _PlanService: PlanService,
    private _AuthService: AuthService
  ) {}
  openStep7() {
    const modalRef = this.modalService.open(Step7Component, {
      centered: true,
      size: 'lg',
    });
    this.activeModal.close();
    this.postPlan();
  }
  openStep5() {
    const modalRef = this.modalService.open(Step5Component, {
      centered: true,
      size: 'lg',
    });
    this.activeModal.close();
  }

  onItemChange(data: any) {
    this.selectedValue = data.target.value;
    // console.log(" Value is : ", data.target.value);
    this._PlanService.userPlan.achiveStatus = parseInt(data.target.value);

    // console.log(this._PlanService.userPlan)
    return this.selectedValue;
  }
  postPlan() {


    // depricated=> see plan service line 50
    console.log(this._PlanService.userPlan);

        this._PlanService
          .postPlan(this._PlanService.userPlan)
          .subscribe(
            { next:(res) => {
            console.log(res);

          }});

    }
}
