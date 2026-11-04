import { Component, EventEmitter, Output } from '@angular/core';
import { PagesService } from './../../../services/pages.service';

@Component({
  selector: 'app-weight-today',
  templateUrl: './weight-today.component.html',
  styleUrl: './weight-today.component.scss'
})
export class WeightTodayComponent {
  userDailyWeight:number=0
  @Output() confirmEvent = new EventEmitter()
constructor(private _PagesService:PagesService){

}



  addWeight(){
    let data={
      weight:this.userDailyWeight
    }
    this._PagesService.logUserDailyWeight(data).subscribe(({
      next:(res)=>{
        console.log(res)
        this.confirmEvent.emit()

      }
    }))
  }
}
