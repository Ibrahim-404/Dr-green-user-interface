import { Component,inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.component.html',
  styleUrl: './password-changed.component.scss'
})
export class PasswordChangedComponent {
	activeModal = inject(NgbActiveModal);

}
