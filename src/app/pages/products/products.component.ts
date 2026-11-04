import { ActivatedRoute } from '@angular/router';
import { PagesService } from './../services/pages.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from '../../../environments/environment.development';
import {
  RootCategory,
  RootCategoryModel,
} from '../interfaces/category-products';
import { switchMap } from 'rxjs';
export interface productByCategory {
  id: number;
  name: string;
  code: string;
  price: number;
  productImages: string[];
  isFavorite: boolean;
  totalSold: any;
}
export class ProductByCategoryModel {
  id: number = 0;
  name: string = '';
  code: string = '';
  price: number = 0;
  productImages: string[] = [];
  isFavorite: boolean = false;
  totalSold: any;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit{
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  rating = 8;
  categoryId: number;
  categoryData: RootCategory = new RootCategoryModel();
  groupedItems: any[][] = [];
  baseUrl: string = environment.baseURL;
  constructor(
    private _PagesService: PagesService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    // console.log(this.images);
    this.categoryId = _ActivatedRoute.snapshot.params['id'];

  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this._ActivatedRoute.params.pipe(switchMap((params) => {
      this.categoryId=params['id']
      return this._PagesService.getCategoryById(this.categoryId)
    })).subscribe({
      next: (res) => {
        this.categoryData = res.data
      },
    })

  }



 getCategoryById(){

 }
}
