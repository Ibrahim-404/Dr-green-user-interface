
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDefaultImage]'
})
export class DefaultImageDirective {
  @Input() appDefaultImage!: string;

  constructor(private el: ElementRef) {}

  @HostListener('error') onError() {
    if (this.appDefaultImage) {
      this.el.nativeElement.src = this.appDefaultImage;
    } else {
      this.el.nativeElement.src = '/assets/default-image.png'; // fallback default image
    }
  }
}
