import { SharedService } from './../../../../shared/services/shared.service';
import { environment } from '../../../../../environments/environment.development';
import { AllTips, Tips } from '../../interfaces/all-tips';
import { TipsService } from './../../services/tips.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss'
})
export class TipsComponent {
  basePath:string=environment.baseURL
  trendingTips:AllTips[]= [new Tips()] ;
  constructor(private _TipsService:TipsService,public _SharedService:SharedService) {
    this.getTrending()
  }

    getTrending(){
      this._SharedService.loadingStatus('start')
      this._TipsService.getAllTips().subscribe({
        next:(res)=>{
          if(res.data){
            console.log(res.data)
           this.trendingTips=res.data.filter((x:any)=>{
              return x.status==20
            })
            this._SharedService.loadingStatus('stop')
          }
        },
        error:(err)=>{

          this._SharedService.loadingStatus('stop')
        }
      })
    }
}
