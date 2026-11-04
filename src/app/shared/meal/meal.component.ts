import { ToasterService } from './../services/toaster.service';
import {
  Component,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddfoodComponent } from '../../pages/profile/myplan/addfood/addfood.component';
import { MyplanService } from '../services/myplan.service';
import { PagesService } from '../../pages/services/pages.service';
import {
  BaseRecommendedPlanMealsAndFood,
  BaseRecommendedPlanMealsAndFoodModel,
  ChosenUserPlanMealAndFoodModel,
  RecommendedPlanMealsAndFood,
  RecommendedPlanMealsAndFoodModel,
} from '../../pages/interfaces/recommended-meals';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.scss',
})
export class MealComponent implements OnChanges {
  @Input() id: number = 0;

  @Input() recommendedMeals: BaseRecommendedPlanMealsAndFood =
    new BaseRecommendedPlanMealsAndFoodModel();
  currRecommendedPlanMealsAndFoods: RecommendedPlanMealsAndFood = new RecommendedPlanMealsAndFoodModel();
    currChosenUserPlanMealAndFoods: any = [];
    // currChosenUserPlanMealAndFoods: ChosenUserPlanMealAndFoodModel = new ChosenUserPlanMealAndFoodModel();
  constructor(
    activalModal: NgbActiveModal,
    private modalService: NgbModal,
    private _PagesService: PagesService,
    public _MyplanService: MyplanService
  ) {}
  ngOnChanges(changes: any): void {
    // console.log('changes',changes)
    if (changes=="1"||changes=="2"||changes=="3"){
      this.id=changes
    }else{

      this.recommendedMeals = changes.recommendedMeals.currentValue;
    }

    //console.log('this.recommendedMeals',this.recommendedMeals);
    this.UserPlanRecommendedMealsAndFoods()
    //console.log('this.id',this.id);
  }

  UserPlanRecommendedMealsAndFoods() {

          let x = this.recommendedMeals.recommendedPlanMealsAndFoods.find((item: RecommendedPlanMealsAndFood) => item.mealTypeId == this.id);
          // //console.log(x)
          if(x){
            this.currRecommendedPlanMealsAndFoods=x
            // //console.log('this.currRecommendedPlanMealsAndFoods',this.currRecommendedPlanMealsAndFoods);
          }
          if(this.recommendedMeals.chosenUserPlanMealAndFoods.length==0){
            this.currChosenUserPlanMealAndFoods=[]

          }else{
            let y = this.recommendedMeals.chosenUserPlanMealAndFoods.find((item: ChosenUserPlanMealAndFoodModel) => item.planMealId == this.currRecommendedPlanMealsAndFoods.id);
            // //console.log(y)
            if (y) {
              this.currChosenUserPlanMealAndFoods = y;
              // //console.log('this.currChosenUserPlanMealAndFoods',this.currChosenUserPlanMealAndFoods);
            }
          }


  }
  openAddFood(id: number) {
    const modalRef = this.modalService.open(AddfoodComponent, {
      centered: true,
      size: 'lg',
    });
    console.log('id', id);
    modalRef.componentInstance.id = id;
  }
}
