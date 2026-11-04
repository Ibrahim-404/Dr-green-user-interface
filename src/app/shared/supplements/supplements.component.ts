import { ToasterService } from './../services/toaster.service';
import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagesService } from '../../pages/services/pages.service';
import { MyplanService } from '../services/myplan.service';
import { BasePlanProducts, BasePlanProductsModel, ChosenUserPlanProduct, ChosenUserPlanProductModel, RecommendedPlanProduct, RecommendedPlanProductModel } from '../../pages/interfaces/recommended-meals';
import { AddDietarySupplementsComponent } from '../../pages/profile/myplan/add-dietary-supplements/add-dietary-supplements.component';

@Component({
  selector: 'app-supplements',
  templateUrl: './supplements.component.html',
  styleUrl: './supplements.component.scss'
})
export class SupplementsComponent  implements  OnChanges{
  @Input() mealTypeId:number=0;
 @Input() userPlanProducts:BasePlanProducts=new BasePlanProductsModel();
  currRecommendedProducts:RecommendedPlanProduct[]=[new RecommendedPlanProductModel()]
  currChosenProducts:any=[]


  constructor(activalModal: NgbActiveModal, private modalService: NgbModal,
    private _PagesService:PagesService,public _MyplanService:MyplanService,
  ) {

    _MyplanService.userPlanProducts.subscribe({
      next:(res)=>{
        this.userPlanProducts=res
        // console.log(this.userPlanProducts)
        this.getChosenProducts()
      }
    })
  }
  ngOnChanges(changes: any) {
    if (changes=="1"||changes=="2"||changes=="3"){
      this.mealTypeId=changes
    }else{
      this.userPlanProducts=changes.userPlanProducts.currentValue
      // this.getChosenProducts()
      // console.log('this.userPlanProducts',this.userPlanProducts)
      this.getChosenProducts()
    }
    // this.mealTypeId=changes.mealTypeId.currentValue
    //console.log('this.mealTypeId',this.mealTypeId)

    // console.log('changes',changes)
    //console.log('this.currChosenProducts',this.currChosenProducts)

  }


  getChosenProducts() {
          let cartona=[]
          if(this.userPlanProducts.chosenUserPlanProducts.length>0){
            this.currRecommendedProducts= this.userPlanProducts.recommendedPlanProducts.filter((item:RecommendedPlanProduct)=>{
            return item.mealTypeId==this.mealTypeId
            })

            for(let chosenProduct of this.userPlanProducts.chosenUserPlanProducts){
              for(let recommendedProduct of this.currRecommendedProducts){
                if(chosenProduct.planProductId==recommendedProduct.id){
                  cartona.push(chosenProduct)
                }

                // console.log('recommendedProduct',this.currRecommendedProducts)
                // console.log('cartona',cartona)
              }
              this.currChosenProducts=cartona
            }
            // console.log('chosenProduct',this.currChosenProducts)
          //  console.log('this.currRecommendedProducts',this.currRecommendedProducts)
          //  console.log('this.currChosenProducts',this.currChosenProducts)
          }else{
            this.currChosenProducts=[]
          }

        }
  openAddDiatrySupplements(id:number) {

          const modalRef = this.modalService.open(AddDietarySupplementsComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.mealTypeId=id
    modalRef.componentInstance.userPlanProducts=this.userPlanProducts
    modalRef.componentInstance.confirmEvent.subscribe({
      next:()=>{
        this._MyplanService.getUserPlanProducts()

        console.log("Added and refreshed")
        modalRef.close();
      }
    })

  }
}
