import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ruler',
  templateUrl: './ruler.component.html',
  styleUrl: './ruler.component.scss'
})
export class RulerComponent {
  @Input() length: number = 100; // Length of the ruler in units
  units: number[] = [];
  ngOnInit(): void {
    this.units = Array(this.length).fill(0).map((x, i) => i);

  }
}
