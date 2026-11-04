import { MyplanService } from './../../../../shared/services/myplan.service';
import {
  ChosenUserPlanMealAndFood,
  PlanMealFood,
  RecommendedFoodModel,
  RecommendedPlanMealsAndFoodModel,
} from './../../../interfaces/recommended-meals';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { RecommendedPlanMealsAndFood } from '../../../interfaces/recommended-meals';
import { PagesService } from '../../../services/pages.service';
import {
  AddmealComponent,
  UserPlanCustomFoodLog,
} from '../addmeal/addmeal.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forEach } from 'core-js/core/array';

interface UserPlanRecommendedFoodLog {
  id: number;
  planMealFoodId: number;
  quantityInGrams: number;
}
@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrl: './addfood.component.scss',
})
export class AddfoodComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() id!: number;
  recommendedMeals: RecommendedPlanMealsAndFood[] = [
    new RecommendedPlanMealsAndFoodModel(),
  ];
  // date:new Date().toLocaleDateString(),
  response: any = {
    date: new Date(),
    planMealId: 0,
    userPlanRecommendedFoodLog: [] as UserPlanRecommendedFoodLog[], // Explicitly typing the array
    userPlanCustomFoodLog: [] as UserPlanCustomFoodLog[], // Explicitly typing the array
  };
  gramsToCal: number[] = [];
  calSubmission: number = 0;
  calInputs: number[] = [];
  itemsSelected: boolean[] = [];
  selectedDate: string | null = null;
  err: string = '';
  totalCal: number = 0;
  chosenFoods: any;
  requestId: number = 0;
  // chosenFoods:ChosenUserPlanMealAndFood[]|[]=[]
  constructor(
    private _PagesService: PagesService,
    activalModal: NgbActiveModal,
    private modalService: NgbModal,
    public _MyplanService: MyplanService
  ) {

    setTimeout(() => {
      for (let x = 0; x < this.recommendedMeals[0].planMealFoods.length; x++) {
        this.calInputs[x] =
          this.recommendedMeals[0].planMealFoods[x].ingredientGrams;
        this.itemsSelected[x] = false;
      }
    }, 1000);
    // console.log(this.calInputs)
  }
  ngOnInit(): void {
    this._MyplanService.customFoodStatus.subscribe((res) => {
      this.callSubmissionFunction();
    });
    this._MyplanService.recommendedMeals.subscribe((res) => {
      this.recommendedMeals = res.recommendedPlanMealsAndFoods;
      console.log('recommended', res);
    })
  }
  ngAfterViewInit(): void {
    this._MyplanService.recommendedMeals.subscribe((res) => {
      console.log('res', res);
      if(this.recommendedMeals.length>0){

        this.recommendedMeals = res.recommendedPlanMealsAndFoods.filter(
          (item: RecommendedPlanMealsAndFood) => {
            console.log('id', this.id);
            if (item) {
              return item.mealTypeId == this.id;
            } else {
              return false;
            }
          }
        );
      }
      console.log('recommended', this.recommendedMeals);
      if (res.chosenUserPlanMealAndFoods.length > 0) {
        let x = res.chosenUserPlanMealAndFoods;
        this.chosenFoods = x.find((res: ChosenUserPlanMealAndFood) => {
          return res.planMealId == this.recommendedMeals[0].id;
        });
        console.log('chosenFoods', this.chosenFoods);
      }
    });
  }

  openAddMeal() {
    const modalRef = this.modalService.open(AddmealComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.planMealId = this.recommendedMeals[0].id;
  }
  getTotalCal(item: PlanMealFood, index: number): number {
    let x = (item.calories * this.calInputs[index]) / item.ingredientGrams;
    // console.log(x)
    this.gramsToCal[index] = x;
    this.callSubmissionFunction();
    return x;
  }
  callSubmissionFunction() {
    this.calSubmission = this.gramsToCal.reduce((a, b) => a + b, 0);
    this.calSubmission = this._MyplanService.customFood.reduce(
      (a, b) => a + Number(b.calories),
      this.calSubmission
    );
  }
  isSelected(item: PlanMealFood, index: number) {
    if (this.itemsSelected[index]) {
      this.calInputs[index] = 0;
      this.itemsSelected[index] = false;
      this.gramsToCal[index] = 0;
      this.callSubmissionFunction();
    } else {
      this.calInputs[index] =
        this.recommendedMeals[0].planMealFoods[index].ingredientGrams;
      this.getTotalCal(item, index);
      this.itemsSelected[index] = true;
      this.callSubmissionFunction();
    }
    // console.log(item)
    console.log(this.itemsSelected);
  }
  addChosenFood() {
    this.response.userPlanRecommendedFoodLog = [];
    this.response.userPlanCustomFoodLog = [];
    this.itemsSelected.forEach((item, index) => {
      this.response.planMealId = this.recommendedMeals[0].id;
      if (item) {
        let data = {
          id: this.recommendedMeals[0].planMealFoods[index].id,
          planMealFoodId: this.recommendedMeals[0].planMealFoods[index].foodId,
          quantityInGrams: this.calInputs[index],
        };
        this.response.userPlanRecommendedFoodLog.push(data);
      }
      this.response.userPlanCustomFoodLog = this._MyplanService.customFood;
    });
    console.log(this.response);
    console.log(this.chosenFoods);
    if (this.chosenFoods) {
      this.response.id = this.chosenFoods?.id;
    }

    this._PagesService.logUserPlanMealsAndFoods(this.response).subscribe({
      next: (res) => {
        console.log(res);
        this._MyplanService.UserPlanRecommendedMealsAndFoods();
      },
      error: (err) => {
        this.err =
          'The same meal cannot be logged more than once on the same day.';
      },
    });
  }
  btnValidation() {
    let x = this.itemsSelected.includes(true);
    return x ? true : false;
  }
  ngOnDestroy() {
    this._MyplanService.customFood = [];
  }
}
