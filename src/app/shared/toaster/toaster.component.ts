import { Component, TemplateRef } from '@angular/core';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' }
})
export class ToasterComponent {
  constructor(public toastService: ToasterService) {}

  isTemplate(toast:any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}

