import { SharedPlanService } from './../../services/shared-plan.service';
import { ToasterService } from './../../../../shared/services/toaster.service';
import { Days } from './../../../interfaces/days';
import { MyplanService } from './../../../../shared/services/myplan.service';
import { PagesService } from './../../../services/pages.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddfoodComponent } from '../addfood/addfood.component';
import {
  BasePlanProducts,
  BasePlanProductsModel,
  BasePlanRecommendationAndGoals,
  BasePlanRecommendationAndGoalsModel,
  BaseRecommendedPlanMealsAndFood,
  BaseRecommendedPlanMealsAndFoodModel,
  BaseTrainingVideos,
  BaseTrainingVideosModel,
  ChosenUserPlanMealAndFood,
  ChosenUserPlanTrainingVideo,
  CommentsAndReplies,
  CommentsModel,
  RecommendedPlanMealsAndFood,
  RecommendedPlanMealsAndFoodModel,
  RecommendedPlanTrainingVideo,
  RecommendedPlanTrainingVideoModel,
  UserPlanGoalLog,
} from '../../../interfaces/recommended-meals';
import { TrainingVideoComponent } from '../training-video/training-video.component';
import { AddmealComponent } from '../addmeal/addmeal.component';
import { BehaviorSubject } from 'rxjs';
import { WeightTodayComponent } from '../weight-today/weight-today.component';
export interface PlanLDetalis {
  id: number;
  name: string;
  durationInDays: number;
  goalCalories: string;
  userId: number;
  userName: string;
  startDate: string;
  endDate: string;
  dailyTargetCalories: number;
  planTargetCalories: number;
  lastCustomerWeight: any;
  userPlanId: number;
}
export class PlanLDetalisModel implements PlanLDetalis {
  id: number = 0;
  name: string = '';
  durationInDays: number = 0;
  goalCalories: string = '';
  userId: number = 0;
  userName: string = '';
  startDate: string = '';
  endDate: string = '';
  dailyTargetCalories: number = 0;
  planTargetCalories: number = 0;
  lastCustomerWeight: any;
  userPlanId: number = 0;
}
export interface PlanList {
  id: number;
  userPlanId: number;
  name: string;
  durationInDays: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
export class PlanListModel implements PlanList {
  id: number = 0;
  userPlanId: number = 0;
  name: string = '';
  durationInDays: number = 0;
  startDate: string = '';
  endDate: string = '';
  isActive: boolean = false;
}
export interface userBodyDetails {
  age: number;
  height: number;
  weight: number;
  gender: number;
  fitnessLevel: number;
  achiveStatus: number;
}
@Component({
  selector: 'app-myplan',
  templateUrl: './myplan.component.html',
  styleUrl: './myplan.component.scss',
})
export class MyplanComponent {
  items: number[] = Array(30).fill(0);
  userBodyDetails?: userBodyDetails;
  date!: Date;
  monthDays: any = [];
  planDays: any[] = [];
  selectedDate: string | null = null;
  userPlanList: PlanList[] = [new PlanListModel()];
  selectedPlanList: PlanList = new PlanListModel();
  // selectedPlanDetails: PlanLDetalis = new PlanLDetalisModel();
  recommendedMeals: BaseRecommendedPlanMealsAndFood =
    new BaseRecommendedPlanMealsAndFoodModel();
  recommendationsAndGoals: BasePlanRecommendationAndGoals =
    new BasePlanRecommendationAndGoalsModel();
  userPlanProducts: BasePlanProducts = new BasePlanProductsModel();
  commentsAndReplays: CommentsModel[] = [new CommentsModel()];
  userPlanId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  comment: string = '';
  sortedTrainingVideosList: RecommendedPlanTrainingVideo[] = [
    new RecommendedPlanTrainingVideoModel(),
  ];
  userWeightHistory: { date: string; weight: number }[] = [];
  trainingVideo: BaseTrainingVideos = new BaseTrainingVideosModel();
  waterQuantity: number = 0;

  dateNow: Date = new Date();
  havePlan: boolean = false;
  constructor(
    activalModal: NgbActiveModal,
    private modalService: NgbModal,
    private _PagesService: PagesService,
    private _MyplanService: MyplanService,
    private _ToasterService: ToasterService,public _SharedPlanService:SharedPlanService
  ) {
    this.date = new Date();
    this.getUserPlans ();

    console.log(this.userPlanList);

    //console.log(this.date); //Wed Aug 21 2024 12:05:29 GMT+0300 (Eastern European Summer Time)

    setTimeout(() => {
      this.onMonthChange();
      // this.getUserPlans();

      // this.onDateChange({
      //   target: { value: this.selectedPlanList.startDate.slice(0, 10) },
      // });


      // this.havePlanStatus();

      //console.log('DateNow', _MyplanService.getFormatedDate(this.dateNow.toLocaleDateString()));
    }, 1000);

    //service listener
    this._MyplanService.recommendedMeals.subscribe((res) => {
      this.recommendedMeals = res;
    });
    // _MyplanService.recommendationsAndGoals.subscribe((res) => {
    //   this.recommendationsAndGoals = res;
    // });
    _MyplanService.userPlanProducts.subscribe((res) => {
      this.userPlanProducts = res;
    });
    _MyplanService.trainingVideo.subscribe((res) => {
      this.trainingVideo = res;
    });
    _MyplanService.selectedPlanList.subscribe((res) => {
      this.selectedPlanList = res;
    });
    _MyplanService.selectedDate.subscribe((res) => {
      this.selectedDate = res;
    });
    _MyplanService.sortedTrainingVideosList.subscribe((res) => {
      this.sortedTrainingVideosList = res;
    });
    // _MyplanService.userBodyDetails.subscribe((res)=>{
    //   this.userBodyDetails=res
    // })
    this.getUserBodyDetails();
    this.getWeightHistory();
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 7,
      },
      740: {
        items: 10,
      },
      940: {
        items: 15,
      },
    },
    nav: false,
  };

  // Getting data from services starts here
  getUserBodyDetails() {
    this._PagesService.getUserBodyDetails().subscribe({
      next: (res) => {
        this.userBodyDetails = res.data;
        //console.log(res.data)
      },
    });
  }
  getWeightHistory() {
    this._PagesService.getUserWeightHistory().subscribe({
      next: (res) => {
        this.userWeightHistory = res.data;
        //console.log(res.data)
      },
    });
  }
  getUserPlanRecommendationAndGoals() {
    this._PagesService
      .getUserPlanRecommendationAndGoals(
        this.selectedPlanList.id,
       null
      )
      .subscribe({
        next: (res) => {
          // console.log(res.data);
          this.recommendationsAndGoals=res.data
          // this.recommendationsAndGoals = res.data;

        },
      });
  }
  getUserPlans() {
    // console.log(this.date.toLocaleDateString());
    //there is a bug at the next line it should be this.date.getMonth()+1
    this._PagesService.listUserPlans(this.date.getMonth()+2).subscribe({
      next: (res) => {
        // //console.log(res);
        this.userPlanList = res.data;
        this.changeList({ target: { value: this.userPlanList[0].id } });

        // this._MyplanService.UserPlanRecommendedMealsAndFoods();
        this.planDays = this._MyplanService.getDatesWithWeekdays(
          this.selectedPlanList.startDate,
          this.selectedPlanList.endDate
        );
        // this.onMonthChange();
        //console.log('this.selectedPlanList.startDate',this.selectedPlanList.startDate)
      },
    });

  }
  getUserPlanProducts() {
    this._PagesService
      .getUserPlanProducts(
        this.selectedPlanList.id,
        this._MyplanService.selectedDate.value
      )
      .subscribe({
        next: (res) => {
          // console.log(res.data);
          // this.userPlanProducts = res.data;
          this.userPlanProducts = res.data;
        },
      });
  }
  getChosenMeals() {
    this.recommendedMeals.recommendedPlanMealsAndFoods.map(
      (x: RecommendedPlanMealsAndFood) => {
        this.recommendedMeals.chosenUserPlanMealAndFoods.find(
          (y: ChosenUserPlanMealAndFood) => {}
        );
        if (x.id) {
        }
      }
    );
  }
  getUserPlanCommentsWithReplies() {
    this._PagesService
      .getUserPlanCommentsWithReplies(this.userPlanId.value)
      .subscribe({
        next: (res) => {
          this.commentsAndReplays = res.data;
          // //console.log(this.commentsAndReplays)
        },
        error: (err) => {
          this.commentsAndReplays = [];
        },
      });
  }

  // Getting data from services ends here

  // Posting data to services starts here
  addComment() {
    let data = {
      userPlanId: this.userPlanId.value,
      comment: this.comment,
    };
     //console.log(data);
    this._PagesService.addCommentToUserPlan(data).subscribe({
      next: (res) => {
         //console.log(res);
        this.getUserPlanCommentsWithReplies();
      },
    });
  }

  // Posting data to services ends here

  // Actions logic start here
  onDateChange(event: any) {
    //console.log(event)
    //console.log(event.target.value);//2024-08-10
    const selectedDate = event.target.value;
    //console.log(selectedDate);
    // this.selectedDate = selectedDate;
    this._MyplanService.selectedDate.next(selectedDate);

    this.getUserPlanRecommendationAndGoals();
    this._MyplanService.UserPlanRecommendedMealsAndFoods();
    this.getUserPlanProducts();
    // this._MyplanService.getUserPlanProducts();
    this._MyplanService.getTrainingVideo();
    this.havePlanStatus();
    // this.filteredItems = this.items.filter(item => item.date === selectedDate);
  }
  onMonthChange() {
    // this.getUserPlans();
    console.log(this.date.getMonth());
    // Get the days of the current month
    this.monthDays = this._MyplanService.getMonthDays(this.date);
    console.log(this.monthDays);
    // Loop through each day in the current month
    this.monthDays.forEach((monthDay: any) => {
        // Compare each day with planDays
        this.planDays.forEach((planDay: any) => {
            // Convert to a consistent date format for comparison
            if (new Date(monthDay.date).toDateString() === new Date(planDay.date).toDateString()) {
                monthDay.selected = true; // Mark as selected if dates match
            }
        });
    });
    console.log(this.monthDays); // Optional: Keep or remove this if no longer needed

  }
  onMonthListChange() {
    this.getUserPlans();
    this.onMonthChange();

  }
  changeList(item: any) {
    let aa = this.userPlanList.filter((x: PlanList) => {
      return x.id == item.target.value;
    });
    this.selectedPlanList = aa[0];
    console.log(this.selectedPlanList);
    this._MyplanService.selectedPlanList.next(aa[0]);

    this.userPlanId.next(this.selectedPlanList.userPlanId);
    this._PagesService.userPlanId.next(this.selectedPlanList.userPlanId);
    // this._PagesService.selectedPlanList=aa[0]
    // this._MyplanService.userPlanDetails();
    // this.UserPlanRecommendedMealsAndFoods();

    // this._PagesService.selectedPlanListId.next(this.selectedPlanList.id);
    this.planDays = this._MyplanService.getDatesWithWeekdays(
      this.selectedPlanList.startDate,
      this.selectedPlanList.endDate
    );
    // this.getUserPlanProducts();
    // this._MyplanService.getUserPlanProducts();
    this.getUserPlanCommentsWithReplies();
    this._MyplanService.getTrainingVideo();
    this.getUserPlanRecommendationAndGoals();

    // this.onMonthChange();

    // this.onDateChange({target:{value: this.selectedPlanList.startDate.slice(0, 10)}});
  }
  increaseQuantity(item: UserPlanGoalLog) {
    let x = Number(item.actualValue) + 1;
    let y = x.toString();
    let data = {
      id: item.id,
      planRecommendationId: item.planRecommendationId,
      actualValue: y,
      date: new Date(),
    };
    this._PagesService.logUserPlanGoals(data).subscribe({
      next: (res) => {
        this.getUserPlanRecommendationAndGoals();
      },
    });
  }
  decreaseQuantity(item: UserPlanGoalLog) {
    let x = Number(item.actualValue) - 1;
    let y = x.toString();
    let data = {
      id: item.id,
      planRecommendationId: item.planRecommendationId,
      actualValue: y,
      date: new Date(),
    };
    this._PagesService.logUserPlanGoals(data).subscribe({
      next: (res) => {
        this.getUserPlanRecommendationAndGoals();
      },
    });
  }
    // Actions logic end here

  // Open modals start here
  openAddFood(id: number) {
    const modalRef = this.modalService.open(AddfoodComponent, {
      centered: true,
      size: 'lg',
    });
  }
  openAddWeight() {
    const modalRef = this.modalService.open(WeightTodayComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.confirmEvent.subscribe({
      next: () => {
        this.getWeightHistory();

        modalRef.close();
      },
    });
  }

  openTrainingVideo(trainingVideo: RecommendedPlanTrainingVideoModel) {
    if (this._MyplanService.canUpdate) {
      const modalRef = this.modalService.open(TrainingVideoComponent, {
        centered: true,
        windowClass: `custom-modal-size`,
      });
      // //console.log(trainingVideo);
      modalRef.componentInstance.trainingVideo = trainingVideo;
      modalRef.componentInstance.planId=this.selectedPlanList.id
    } else {
      this._ToasterService.show(
        'Training video expired You can not open training video now'
      );
    }
  }

  // Open modals end here



  //shared logic starts here
  havePlanStatus() {
    if (this.selectedDate) {
      let x = new Date(this.selectedDate).toLocaleDateString();
      //console.log(x)
      let y = this.dateNow.toLocaleDateString();
      //console.log('selectedDate', new Date(this.selectedDate).toLocaleDateString());
      if (x == y) {
        //console.log(x)
        //console.log('same date')
        this._MyplanService.canUpdate = true;
      } else {
        //console.log("doesn't same date")
        this._MyplanService.canUpdate = false;
      }
    }
  }
  //shared logic ends here
}
