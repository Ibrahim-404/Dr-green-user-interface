import { AfterViewInit, Component, inject, Input,  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrl: './add-to-card.component.scss'
})
export class AddToCardComponent implements AfterViewInit {
  @Input('product') product: any;
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
ngAfterViewInit(): void {
  // console.log(this.product);

}
}
