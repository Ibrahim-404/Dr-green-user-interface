import { environment } from '../../../../../../environments/environment.development';
import { SharedService } from '../../../../../shared/services/shared.service';
import { AllTips, Tips } from '../../../interfaces/all-tips';
import { TipsService } from './../../../services/tips.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss'
})
export class WorkoutsComponent {
  baseUrl=environment.baseURL
  workoutsTips:AllTips[]=[new Tips()]
  constructor(private _TipsService:TipsService,public _SharedService:SharedService) {
    this.getWorkouts()
  }

  getWorkouts(){
    this._SharedService.loadingStatus('start')
    this._TipsService.getAllTips().subscribe({
      next:(res)=>{
        if(res.data){
          this.workoutsTips=res.data.filter((x:any)=>{
            return x.tipsDepartmentTitle==20
          })
        }
        // console.log('workouts',this.workoutsTips)
        this._SharedService.loadingStatus('stop')
      }
    })
  }
}
