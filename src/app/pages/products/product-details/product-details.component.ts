import { AuthService } from './../../../features/services/auth.service';
import { PagesService } from './../../services/pages.service';
import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { register } from 'swiper/element/bundle';
import { AddToCardComponent } from '../add-to-card/add-to-card.component';
import { ActivatedRoute } from '@angular/router';
import { ProductById, ProductByIdModel } from '../../interfaces/product-by-id';
import { environment } from '../../../../environments/environment.development';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',

})
export class ProductDetailsComponent implements OnInit{
  baseUrl = environment.baseURL;
  categoryProducts: ProductById[] = [new ProductByIdModel()];
  selectedValue = '';
  errTitle: string = '';
  productData: ProductById = new ProductByIdModel();
  productImages: any[] = [];
  id: number=-1;
  basePath: string = environment.baseURL;
  selectedQuantity: number = 1;
  addRate:number|null=0;
  addComment:string='';
  ratingSum: number = 0;
  ratingCounts = [0, 0, 0, 0, 0];
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  constructor(
   private _ActivatedRoute: ActivatedRoute,
    private _PagesService: PagesService,
    private _AuthService: AuthService
  ) {

  }
  ngOnInit(): void {
    this._ActivatedRoute.params.pipe(switchMap((params) =>{
      this.id=params['id'];
      return this._PagesService.getProductById(this.id)
    })).subscribe({
      next: (res) => {
        this.productData = res.data;
        // this.productImages=this.productData.productImages;
        this.productImages = this.productData.productImages.map((img) => ({
          img: img,
          selected: false,
        }));
        // console.log(this.productImages);
        this.selectedValue=this.productImages[0].img;
        this.calculateRating();
        this.getProductsByCategory();
      }
    })
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
getProductsByCategory() {
  this._PagesService.getCategoryById(this.productData.productCategories[0].categoryId).subscribe({
    next: (res) => {
      this.categoryProducts = res.data.productCategories;
    },
  })
}
  addProductToCart() {
    let product = {
      quantity: this.selectedQuantity,
      productId: this.productData.id,
      userId: this._AuthService.userData.value?.nameid,
    };
    // console.log(product);
    this._PagesService.postProductToCard(product).subscribe({
      next: (res) => {
        // console.log('done', res);
        this.openAddToCardComponent();
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
  get selectedImages() {
    return this.productImages.filter((image) => image.selected);
  }
  toggleSelect(index: number) {
    this.productImages.forEach(image => image.selected = false);

    this.productImages[index].selected = !this.productImages[index].selected;
    this.selectedValue = this.productImages[index].img;
  }

  openAddToCardComponent() {
    const modalRef = this.modalService.open(AddToCardComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.product = this.productData;
  }

  calculateRating() {
    this.productData.reviewProducts.forEach(project => {
      if (project.rating >= 1 && project.rating <= 5) {
        let x=project.rating
        this.ratingCounts[x-1]++;
        this.ratingSum++
      }
  });
  // console.log(this.ratingCounts);
  }

  addingReview() {
    let review={
      rating: this.addRate,
      comment: this.addComment,
      productId: this.id
    }
    // console.log(review);
    this._PagesService.addReview(review).subscribe({
      next: (res) => {
        // console.log(res);

      },
      error: (err) => {
        console.log(err);
        // console.log(err.error.title);
        this.errTitle = err.error.title;
      },
    })
  }
  onCheckboxChange(i:number){
    this.addRate = this.addRate === i ? null : i;
    // console.log(this.addRate);
  }
}
