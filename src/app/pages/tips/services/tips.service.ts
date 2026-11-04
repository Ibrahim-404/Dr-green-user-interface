import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllTips, Tips } from '../interfaces/all-tips';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  baseUrl:string=environment.baseURL;
  private filter={
  "pageNumber": 1,
  "pageSize": 20
}
allTipsData: AllTips[]=[]


  constructor(private _HttpClient:HttpClient) {
    this.TipsData()
  }
  getAllTips():Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}api/Tips/GetAllTips`,this.filter)
  }

 private TipsData(){

    this.getAllTips().subscribe(res=>{
      // console.log('tips ',res)
      this.allTipsData=res.data;
    })
  }
}
