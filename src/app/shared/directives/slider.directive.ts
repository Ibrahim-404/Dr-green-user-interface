import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective {
@Input() itemsPerSlide: number = 4;
@Input() allItems: any[] = [];

groupedImages: any[][] = [];

  constructor() {
    this.groupImages()
   }
  private groupImages() {
    for (let i = 0; i < this.allItems.length; i += this.itemsPerSlide) {
      this.groupedImages.push(this.allItems.slice(i, i + this.itemsPerSlide));
    }
  }
   
}
