import { Injectable } from '@angular/core';

import { format, addDays } from 'date-fns';
import { PagesService, UserPlanCustomFoodLog } from '../../pages/services/pages.service';
import { BehaviorSubject } from 'rxjs';
import { BasePlanProducts, BasePlanProductsModel, BasePlanRecommendationAndGoals, BasePlanRecommendationAndGoalsModel, BaseRecommendedPlanMealsAndFood, BaseRecommendedPlanMealsAndFoodModel, BaseTrainingVideos, BaseTrainingVideosModel, ChosenUserPlanTrainingVideo, RecommendedPlanTrainingVideo, RecommendedPlanTrainingVideoModel } from '../../pages/interfaces/recommended-meals';
import { PlanList, PlanListModel, userBodyDetails } from '../../pages/profile/myplan/myplan/myplan.component';

@Injectable({
  providedIn: 'root'
})
export class MyplanService {
  customFood:UserPlanCustomFoodLog[]=[]
  customFoodStatus: BehaviorSubject<boolean> = new BehaviorSubject(false)
  canUpdate: boolean = false;
  recommendedMeals:BehaviorSubject<BaseRecommendedPlanMealsAndFood>=new BehaviorSubject(new BaseRecommendedPlanMealsAndFoodModel)
  userPlanProducts:BehaviorSubject<BasePlanProducts>=new BehaviorSubject(new BasePlanProductsModel)
  trainingVideo:BehaviorSubject<BaseTrainingVideos>=new BehaviorSubject(new BaseTrainingVideosModel)
  // recommendationsAndGoals:BehaviorSubject<BasePlanRecommendationAndGoals>=new BehaviorSubject(new BasePlanRecommendationAndGoalsModel)
  selectedPlanList:BehaviorSubject<PlanList>=new BehaviorSubject(new PlanListModel)
  selectedDate:BehaviorSubject<any>=new BehaviorSubject(null)
  sortedTrainingVideosList:BehaviorSubject<RecommendedPlanTrainingVideo[]> = new BehaviorSubject([new RecommendedPlanTrainingVideoModel])
  // userBodyDetails:BehaviorSubject<userBodyDetails>=new BehaviorSubject({age:0,height:0,weight:0,gender:0,fitnessLevel:0,achiveStatus:0})
  constructor(private _PagesService: PagesService) {

    // console.log("this.getMonthDays",this.getMonthDays(new Date('2024-.8-01')));
  }
  // plan shared methods

  UserPlanRecommendedMealsAndFoods() {
    this._PagesService
      .getRecommendedMealsAndFoods(this.selectedPlanList.value.id, this.selectedDate.value)
      .subscribe({
        next: (res) => {
          // this.recommendedMeals = res.data;
          this.recommendedMeals.next(res.data)
          console.log(this.recommendedMeals.value);
        },
      });
  }
  // getUserPlanRecommendationAndGoals() {
  //   this._PagesService
  //     .getUserPlanRecommendationAndGoals(
  //       this.selectedPlanList.value.id,
  //       this.selectedDate.value
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         // console.log(res.data);
  //         this.recommendationsAndGoals.next(res.data)
  //         // this.recommendationsAndGoals = res.data;

  //       },
  //     });
  // }
  getUserPlanProducts() {
    this._PagesService
      .getUserPlanProducts(this.selectedPlanList.value.id, this.selectedDate.value)
      .subscribe({
        next: (res) => {
          console.log(res.data);
          // this.userPlanProducts = res.data;
          this.userPlanProducts.next(res.data)
        },
      });
  }
  // userPlanDetails() {
  //   if(this.selectedPlanList.value.id){

  //     this._PagesService.getUserPlanById(this.selectedPlanList.value.id).subscribe({
  //       next: (res) => {
  //         this._PagesService.selectedPlanList.next(res.data) ;

  //       },
  //     });
  //   }
  // }
  getTrainingVideo() {
    this._PagesService
      .getTrainingVideo(this.selectedPlanList.value.id,this.selectedDate.value)
      .subscribe({
        next: (res) => {
          // console.log('videooooooooooooooo', res.data);
          // this.trainingVideo = res.data;
          this.trainingVideo.next(res.data)
          this.sortedTrainingVideos();
        },
      });
  }
  sortedTrainingVideos() {
    let x: RecommendedPlanTrainingVideo[] = [];

    for (let y of this.trainingVideo.value.recommendedPlanTrainingVideos) {
      const isChosen = this.trainingVideo.value.chosenUserPlanTrainingVideos.some(
        (z: ChosenUserPlanTrainingVideo) => y.id === z.planTrainingVideoId
      );

      if (isChosen) {
        x.push(y);
        x[x.length - 1].isWatched = y.isWatched;
      } else {
        x.unshift(y);
      }
    }
    this.sortedTrainingVideosList.next(x);
    // console.log(x);
  }
  // getUserBodyDetails(){
  //   this._PagesService.getUserBodyDetails().subscribe({
  //     next:(res)=>{
  //         this.userBodyDetails=res.data
  //     }
  //   })
  // }
























  getMonthDays(date:Date): Array<{ date: string, weekday: string }> {
    let month= date.getMonth()
    let year=date.getFullYear()
    const datesWithWeekdays: Array<{ date: string, weekday: string }> = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month+1, 0);
    const dates = this.getDatesWithWeekdays(format(firstDayOfMonth, 'yyyy-MM-dd'), format(lastDayOfMonth, 'yyyy-MM-dd'));
    return dates;
  }

  getDatesWithWeekdays(startDate: string, endDate: string): Array<{ date: string, weekday: string }> {
    const datesWithWeekdays: Array<{ date: string, weekday: string }> = [];

    // Convert input strings to Date objects
    let currentDate = new Date(startDate);
    const finalDate = new Date(endDate);

    // Loop through the date range
    while (currentDate <= finalDate) {
        const dateStr = format(currentDate, 'yyyy-MM-dd');
        const weekdayName = format(currentDate, 'EEEE'); // 'EEEE' gives the full name of the weekday

        // Push the date and weekday name to the array
        datesWithWeekdays.push({ date: dateStr, weekday: weekdayName });

        // Move to the next day
        currentDate = addDays(currentDate, 1);
    }

    return datesWithWeekdays;
}
  getFormatedDate(date:string){
    // console.log(date)
    let x=date.split('/')
    let y=[x[2],x[0],x[1]].join('-')
    console.log(y)
    return y
  }

}
