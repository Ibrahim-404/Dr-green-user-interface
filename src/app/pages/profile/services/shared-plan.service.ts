import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPlanService {
  calendarValue: Date=new Date();
  constructor() { }
}
