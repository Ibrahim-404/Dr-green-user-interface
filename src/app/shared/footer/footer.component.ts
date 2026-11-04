import { SharedService } from './../services/shared.service';
import { RootCategory, RootCategoryModel } from './../../pages/interfaces/category-products';
import { Category, CategoryModel } from './../../pages/interfaces/category';
import { PagesService } from './../../pages/services/pages.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  parentsCategories: Category[] = [new CategoryModel()];
  constructor(private _PagesService:PagesService,private _SharedService:SharedService) {

    this.getAllCategories();
  }
  getAllCategories() {
    this._SharedService.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res);
        this.parentsCategories = res.data.filter(
          (el: Category) => el.categoryParentId == null
        );
      },
    });
  }
}
