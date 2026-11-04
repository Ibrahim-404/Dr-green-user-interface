import { SharedService } from './../../../../../shared/services/shared.service';
import { AllTips, Tips } from '../../../interfaces/all-tips';
import { TipsService } from './../../../services/tips.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrl: './nutrition.component.scss'
})
export class NutritionComponent {
  nutritionData:AllTips[]=[new Tips()]
  constructor(public _TipsService:TipsService,public _SharedService:SharedService) {
    this.getNutrition()
  }
  getNutrition(){
    this._SharedService.loadingStatus('start')
    this._TipsService.getAllTips().subscribe({
      next:res=>{
        if(res.data){

          this.nutritionData=res.data.filter((x:any)=>{
            return x.tipsDepartmentTitle==10
          })
          this._SharedService.loadingStatus('stop')
          // console.log('nutrition',this.nutritionData)
        }
      },
      error:(err)=>{
        this._SharedService.loadingStatus('stop')
      }
    })
  }

}
