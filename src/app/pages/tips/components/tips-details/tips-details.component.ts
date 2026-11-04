import { SharedService } from './../../../../shared/services/shared.service';
import { PagesService } from './../../../services/pages.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Tip, TipModel } from '../../interfaces/tip';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-tips-details',
  templateUrl: './tips-details.component.html',
  styleUrl: './tips-details.component.scss'
})
export class TipsDetailsComponent {
  itemId:number
  tipData:Tip=new TipModel()
  basePath: string = environment.baseURL;
  allTips:Tip[]=[new TipModel()]
constructor(private _ActivatedRoute:ActivatedRoute,private _PagesService:PagesService,public _SharedService:SharedService){

this.itemId = _ActivatedRoute.snapshot.params['id']
  console.log(this.itemId)
  this.getTipsById()
  this.getAllTips()
}
getTipsById(){
  this._SharedService.loadingStatus('start')
  this._PagesService.getTipsById(this.itemId).subscribe({
    next:res=>{
      // console.log(res)
      this.tipData=res.data
      this._SharedService.loadingStatus('stop')
    },
    error:err=>{
      console.log(err)
      this._SharedService.loadingStatus('stop')
    }

  })
}
getAllTips(){
  this._SharedService.loadingStatus('start')
  this._PagesService.getAllTips().subscribe({
    next:res=>{
      // console.log(res)
      this.allTips = res.data.filter((x:any)=>{
        return x.tipsDepartmentTitle==this.tipData.tipsDepartmentTitle
      })
      // console.log('this.allTips',this.allTips)
      this._SharedService.loadingStatus('stop')
    },
    error:err=>{
      console.log(err)
      this._SharedService.loadingStatus('stop')
    }
  })
}

}
