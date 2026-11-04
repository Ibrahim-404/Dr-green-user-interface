import { MyplanService } from './../../../../shared/services/myplan.service';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, output, SimpleChanges } from '@angular/core';
import {
  BasePlanProducts,
  BasePlanProductsModel,
  BaseRecommendedPlanMealsAndFood,
  BaseRecommendedPlanMealsAndFoodModel,
  RecommendedPlanMealsAndFood,
  RecommendedPlanMealsAndFoodModel,
  RecommendedPlanProduct,
} from '../../../interfaces/recommended-meals';
import { PagesService } from '../../../services/pages.service';
import { RecommendedPlanProductModel } from './../../../interfaces/recommended-meals';
interface Dietry{
  id?: number

}
@Component({
  selector: 'app-add-dietary-supplements',
  templateUrl: './add-dietary-supplements.component.html',
  styleUrl: './add-dietary-supplements.component.scss',
})
export class AddDietarySupplementsComponent implements OnDestroy,OnChanges,AfterViewInit {
  recommendedProducts: RecommendedPlanProduct[] = [
    new RecommendedPlanProductModel(),
  ];
  @Input() mealTypeId!: number;
  @Input() userPlanProducts: BasePlanProducts = new BasePlanProductsModel();
  @Output() confirmEvent = new EventEmitter();
  selectedDate: string | null = null;
  itemsSelected:boolean[]=[]
  response:any[]=[]

  constructor(private _PagesService: PagesService,private _MyplanService: MyplanService,private cdRef: ChangeDetectorRef) {

    // this.dietaryProducts();
    for(let x=0; x< this.recommendedProducts.length;x++){
      this.itemsSelected[x]=false
    }
  }
  ngOnInit(): void {
    // console.log(this.mealTypeId);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes  ',changes);
    if (changes['mealTypeId']) {
      this.mealTypeId = changes['mealTypeId'].currentValue;
      // console.log(this.mealTypeId);
    }else if(changes['userPlanProducts']){
      this.userPlanProducts = changes['userPlanProducts'].currentValue;
    }
    console.log(this.userPlanProducts);
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  this.dietaryProducts()
    console.log(this.userPlanProducts);
    this.cdRef.detectChanges();
  }
  isSelected(item:RecommendedPlanProduct,index:number){
    this.itemsSelected[index]=!this.itemsSelected[index]
    console.log(item)
    console.log(this.itemsSelected)
  }
  dietaryProducts() {



          this.recommendedProducts = this.userPlanProducts.recommendedPlanProducts.filter((res:RecommendedPlanProduct)=>{
            return res.mealTypeId==this.mealTypeId
          });

          console.log(this.userPlanProducts);
  }
  addChosenProducts(){
    this.itemsSelected.forEach((item, index) => {

      if (item) {
        this.response.push(this.recommendedProducts[index].id)
        };


      });
      this._PagesService.logUserPlanProducts(this.response).subscribe({
        next:(res)=>{
          console.log(res)
          this.confirmEvent.emit();
        }
      })
  console.log(this.response)

  }
  ngOnDestroy(): void {
console.log('destroyed')
  }
}
