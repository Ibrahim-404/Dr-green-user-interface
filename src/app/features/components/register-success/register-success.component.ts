import { Component,inject } from '@angular/core';
import {  NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanComponent } from '../../../pages/plan/components/plan/plan.component';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.scss'
})
export class RegisterSuccessComponent {
  private modalService = inject(NgbModal);
	activeModal = inject(NgbActiveModal);
  openPlan() {
    const modalRef = this.modalService.open(PlanComponent, {
      centered: true,
      size: 'lg',
    }
  )
  this.activeModal.close()
};
}
