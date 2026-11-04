import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmNumberComponent } from '../confirm-number/confirm-number.component';

@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.component.html',
  styleUrl: './change-number.component.scss'
})
export class ChangeNumberComponent {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  openConfirmNumber(){
    this.modalService.open(ConfirmNumberComponent,{
      centered:true
    })
    this.activeModal.close()
  }
}
