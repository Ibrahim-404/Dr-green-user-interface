import { MyplanService } from './../../../../shared/services/myplan.service';
import { PagesService } from './../../../services/pages.service';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
export interface UserPlanCustomFoodLog {

  name: string
  calories: number
  quantityInGrams: number
}
@Component({
  selector: 'app-addmeal',
  templateUrl: './addmeal.component.html',
  styleUrl: './addmeal.component.scss'
})
export class AddmealComponent {
@Input() planMealId=0
  customFoodForm:FormGroup <{

    name: FormControl<string | null>,
  calories: FormControl<number | null>,
  quantityInGrams: FormControl<number | null>,
}>;
  nameCtrl:FormControl<string | null>;
  quantityInGramsCtrl:FormControl<number | null>;
  caloriesCtrl:FormControl<number | null>;
;
  activeModal = inject(NgbActiveModal);
  canUpdate:boolean=false

  constructor(  activalModal: NgbActiveModal,private modalService: NgbModal,
    private _PagesService:PagesService,_fb:FormBuilder,private _MyplanService:MyplanService) {
    this.nameCtrl = _fb.control('');
    this.quantityInGramsCtrl = _fb.control(null);
    this.caloriesCtrl = _fb.control(null);


    this.customFoodForm=_fb.group({

      name:this.nameCtrl,
      quantityInGrams:this.quantityInGramsCtrl,
      calories:this.caloriesCtrl
    })


  }

  onSave(){
    // this.modalService.dismissAll();
    let data={
      planMealId:this.planMealId,
      chosenUserPlanMealAndFoods:[this.customFoodForm.value],
    }
    console.log(data);
    this._MyplanService.customFood.push({
      name: this.customFoodForm.value.name ?? '',
      calories: this.customFoodForm.value.calories ?? 0,
      quantityInGrams: this.customFoodForm.value.quantityInGrams ?? 0,
    });
    console.log(this._MyplanService.customFood);
   let status = this._MyplanService.customFoodStatus.value
    this._MyplanService.customFoodStatus.next(status);
    this.resetForm();
    this.activeModal.dismiss()

  }
  resetForm(){
    this.customFoodForm.reset();
  }
}
