import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CongratesComponent } from '../congrates/congrates.component';

@Component({
  selector: 'app-confirm-number',
  templateUrl: './confirm-number.component.html',
  styleUrl: './confirm-number.component.scss'
})
export class ConfirmNumberComponent {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  openCongrates(){
    this.modalService.open(CongratesComponent,{
      centered:true
    })
    this.activeModal.close()
  }
}
