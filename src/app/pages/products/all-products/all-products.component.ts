import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PagesService } from '../../services/pages.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
export interface Product {
  id: number
  name: string
  highloghts: string
  description: string
  status: number
  publishDate: any
  actualPrice: number
  price: number
  priceAfterDiscount: number
  code: string
  quantity: number
  stockStatus: number
  overAllRating: number
  isFavorite: boolean
  isInCart: boolean
  productImages: string[]
  productCategories: ProductCategory[]
  highlights: Highlight[]
  specifications: Specification[]
  reviewProducts: any[]
  productCategory: any[]
}

export interface ProductCategory {
  categoryId: number
}

export interface Highlight {
  id: number
  title: string[]
  isProduct: boolean
  isPackage: boolean
}

export interface Specification {
  id: number
  title: string
  content: string
  isProduct: boolean
  isPackage: boolean
}
export interface Package {
  name: string
  highloghts: string
  description: string
  status: number
  publishDate: any
  actualPrice: number
  price: number
  priceAfterDiscount: number
  stockStatus: number
  overAllRating: any
  packageProducts: any
  packageCategories: any
  images: any
  highlights: any
  specifications: any
  reviewPackages: any
  userFavoritePackages: any
  createdDate: string
  lastEditDate: string
  userCreatedName: string
  userLastEditName: string
  ipDeviceCreaded: string
  ipDeviceLastEdit: string
  isDeleted: boolean
  clientId: string
  id: number
}
export class PackageModel implements Package{

  name: string = ''
  highloghts: string = ''
  description: string = ''
  status: number = 0
  publishDate: any = ''
  actualPrice: number = 0
  price: number = 0
  priceAfterDiscount: number = 0
  stockStatus: number = 0
  overAllRating: any = 0
  packageProducts: any = []
  packageCategories: any = []
  images: any = []
  highlights: any = []
  specifications: any = []
  reviewPackages: any = []
  userFavoritePackages: any = []
  createdDate: string = ''
  lastEditDate: string = ''
  userCreatedName: string = ''
  userLastEditName: string = ''
  ipDeviceCreaded: string = ''
  ipDeviceLastEdit: string = ''
  isDeleted: boolean = false
  clientId: string = ''
  id: number = 0
}
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  rating = 8;
allProducts:Product[] = []
currProducts:Product[] = []
allPackages:Package[] = []
bestSellerProducts:Product[] = []
page:number = 1
  baseUrl: string = environment.baseURL;
  constructor(
    private _PagesService: PagesService,
    private _ActivatedRoute: ActivatedRoute
  ) {



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
    this.getAllProducts()
    this.getAllPackages()
    this.getBestSeller()
  }


getBestSeller(){
  this._PagesService.getBestSeller().subscribe({
    next:(res)=>{

      this.bestSellerProducts=res.data

    }
  })
}
 getAllProducts(){
  this._PagesService.getAllProducts().subscribe({
    next:(res)=>{this.allProducts=res.data
      this.pageChange(this.page)
    }
  })
 }
 getAllPackages(){
  this._PagesService.getAllPackages().subscribe({
    next:(res)=>{

    }
  })
 }
 pageChange(page:number){
  console.log((page-1)*8,page*8)
   this.currProducts = this.allProducts.slice((page-1)*8,page*8)

 }
}
