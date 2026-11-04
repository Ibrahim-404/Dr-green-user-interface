import { SharedService } from './../../shared/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { PagesService, toggleProductFav } from './../services/pages.service';
import { Component, inject } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanComponent } from '../plan/components/plan/plan.component';
import { LookUpByStatus } from '../interfaces/look-up-by-status';
import { Reviews } from '../interfaces/reviews';
import { Ads } from '../interfaces/ads';
import { environment } from '../../../environments/environment.development';
import { LocalStorageService } from '../../services/local-storage.service';
import { Products, ProductsModel } from '../interfaces/products';

export interface favoriteProducts {
  id: number
  name: string
  description: string
  status: number
  publishDate: string
  price: number
  priceAfterDiscount: number
  code: string
  stockStatus: number
  overAllRating: any
  productImages: any[]
  createdDate: string
  productCategories: any[]
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  basePath: string = environment.baseURL;
  lookUpData: LookUpByStatus | null = null;
  adsData: Ads[] | [] = [];
  reviewsData: Reviews[] | [] = [];
  tipsData: any = [];
  groupedImages: any[][] = [];
  bestSeller:Products[]=[new ProductsModel()]
  encodedToken: any;
  constructor(
    config: NgbCarouselConfig,
    private _PagesService: PagesService,
    // private _AuthService: AuthService,
    private _localStorage:LocalStorageService,
    private translate: TranslateService,
    public _SharedService: SharedService,

  ) {

  }
  private modalService = inject(NgbModal);
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
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  ngOnInit(): void {

    this.getAds();
    this.getLookUp();
    this.getReviews();
    this.getTips();
    this.getAllProducts()
  }

  // bestSeller slider
  images = [1, 2, 3, 5].map((n) => `assets/test/${n}.png`);
  showNavigationArrows = false;
  showNavigationIndicators = true;
  sliderImages = [1055, 194, 368].map(
    (n) => `https://picsum.photos/id/${n}/900/500`
  );



  getLookUp() {
    this._PagesService
      .getLookUpByStatus(this._PagesService.lookUpEnums.AboutUs)
      .subscribe((res) => {
        // console.log(res.data)
        this.lookUpData = res.data;
      });
  }
  getAds() {
    this._SharedService.loadingStatus('start')
    this._PagesService.getAds().subscribe((res) => {
      console.log('ads', res.data);
      this.adsData = res.data;
      this._SharedService.loadingStatus('stop')
    });
  }
  openPlan() {
    const modalRef = this.modalService.open(PlanComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.calculateCalories=true
  }

  getReviews() {
    this._SharedService.loadingStatus('start')
    this._PagesService.getAllReviews().subscribe(
      (res) => {
        // console.log('reeview ', res.data);
        this.reviewsData = res.data;
        this._SharedService.loadingStatus('stop')
      },
      (error) => {
        // console.log('review error ', error);
      }
    );
  }
  // balanced section starts
  getTips() {
    this._SharedService.loadingStatus('start')
    this._PagesService.getAllTips().subscribe({
      next: (res) => {
        if (res?.data) {
          this.tipsData = res.data.filter((x: any) => x.status == 10);
          this.groupImages();
          this._SharedService.loadingStatus('stop')}
      },
      error: (err) => {},
    });
  }
  groupImages() {
    for (let i = 0; i < this.tipsData.length; i += 3) {
      this.groupedImages.push(this.tipsData.slice(i, i + 3));
      console.log(this.groupedImages);

    }
  }
  getAllProducts(){
    this._SharedService.loadingStatus('start')
    this._PagesService.getAllProducts().subscribe({

      next:(res)=>{
          this.bestSeller=res.data
          this._SharedService.loadingStatus('stop')
      }
    })
  }
}
