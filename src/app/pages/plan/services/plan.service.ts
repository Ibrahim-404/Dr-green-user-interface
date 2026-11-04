import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../features/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plan } from '../interfaces/plan';
import { environment } from '../../../../environments/environment.development';
import { LocalStorageService } from './../../../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private baseUrl: String = environment.baseURL;
  userPlan: Plan = {
    age: null,
    height: null,
    weight: null,
    gender: null,
    fitnessLevel: null,
    achiveStatus: null,
  };
  fitnessLevel: any = {
    Extraactive: 10,
    VeryActive: 20,
    Active: 30,
    LowActive: 40,
    Secondary: 50,
    Other: 100,
  };
  calculateCalories:boolean=false
  havePlan: boolean = false;
  planResult: BehaviorSubject<any> = new BehaviorSubject(0);
  constructor(
    private _HttpClient: HttpClient,
    private _auth: AuthService,
    private _LocalStorageService: LocalStorageService
  ) {
  }
  postPlan(data: Plan): Observable<any> {
    console.log(this.calculateCalories)
    if(this.calculateCalories){
      let test = this.CalculateBMR(this.userPlan);
      console.log(test);
      this.planResult.next(test);
      return this.planResult
    }else{
      return this._HttpClient.post(
        `${this.baseUrl}api/UserPlan/RequestPlan?userId=${this._auth.userData.value.nameid}`,
        data
      );
    }

  }


  CalculateBMR(user: any): Observable<any> {
    if (user.gender == '10') {
      let BMR =
        88.362 + 13.397 * user.weight + 4.799 * user.height - 5.677 * user.age;
      return this.CalculateBMRWithActivity(BMR, user);
    } else user.Gender == '20';
    {
      let BMR =
        447.593 + 9.247 * user.weight + 3.098 * user.height - 4.33 * user.age;
      return this.CalculateBMRWithActivity(BMR, user);
    }
  }

  private CalculateBMRWithActivity(BMR: any, user: any) {
    switch (user.fitnessLevel) {
      case user.fitnessLevel == '10':
        BMR = BMR * 1.9;
        break;
      case user.fitnessLevel == '20':
        BMR = BMR * 1.725;
        break;
      case user.fitnessLevel == '30':
        BMR = BMR * 1.55;
        break;
      case (user.fitnessLevel = '40'):
        BMR = BMR * 1.375;
        break;
      case user.fitnessLevel == '50':
        BMR = BMR * 1.2;
        break;
      default:
        BMR = BMR * 1.0;
        break;
    }
    return BMR;
  }
}
