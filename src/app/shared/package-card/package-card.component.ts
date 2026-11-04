import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Package, PackageModel } from '../../pages/products/all-products/all-products.component';
import { PagesService, toggleProductFav } from '../../pages/services/pages.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthService } from '../../features/services/auth.service';
import { ToasterService } from '../services/toaster.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../features/components/login/login.component';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.scss'
})
export class PackageCardComponent {
  baseUrl = environment.baseURL;

  @Input() package: Package = new PackageModel ();
  isFavorite: boolean=false;
  constructor(
    private _PagesService: PagesService,
    private _LocalStorageService: LocalStorageService,
    private _AuthService: AuthService,
    private cdr: ChangeDetectorRef,
    private toastService: ToasterService,
    activalModal: NgbActiveModal,
    private modalService: NgbModal
  ) {

  }
  openLogin() {


    const modalRef = this.modalService.open(LoginComponent, {
      centered: true,
      size: 'lg',
    });

  }
  showToast(message:string) {
    this.toastService.show(`Item ${message} successfully`, {


      classname: 'bg-success text-light',
    });
  }
  ngAfterViewInit(): void {
    // this.isFavorite = this.package.;
    this.cdr.detectChanges(); // This will manually trigger change detection

  }

  toggleFavorite() {
    if(this._AuthService.userData.value==null){
      this.openLogin();
    }else{

      let data: toggleProductFav = {
        productId: Number(this.package.id),
      };
      this._PagesService.postToggleProductInFavorite(data).subscribe({
        next: (res) => {
          // console.log(res);
          this.isFavorite = !this.isFavorite;
          this.isFavorite==true?this.showToast('added'):this.showToast('removed');

        },
      });
    }
  }
  addItemToCart() {
    let req = {
      quantity: 1,
      // productId: this.card.id,
      userId: Number(this._AuthService.userData.value?.nameid),
    };
    if (this._AuthService.userData.value == null) {
      this.openLogin();
    }else{
      this._PagesService.postProductToCard(req).subscribe({
        next: (res) => {
          // console.log(res);
          // console.log(req);
          this.showToast('added');
        },
        error: (err) => {
          // console.log(err);
          // console.log(req);
        },
      });
    }
    // console.log(this.card);
  }
}
