import { SharedService } from './../services/shared.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, inject } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../features/components/login/login.component';
import { AuthService } from '../../features/services/auth.service';
import { PlanComponent } from '../../pages/plan/components/plan/plan.component';
import { TranslateService } from '@ngx-translate/core';
import { Category, CategoryModel } from '../../pages/interfaces/category';
import { User, UserModel } from '../../pages/interfaces/user';
export interface DropdownItem {
  label: string;
  children?: DropdownItem[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private modalService = inject(NgbModal);
  allCategoriesData: Category[] = [new CategoryModel()];
  parentsCategories: Category[] = [new CategoryModel()];


  userData: User = new UserModel();

  constructor(
    public _auth: AuthService,
    private _LocalStorageService: LocalStorageService,
    public _SharedService: SharedService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'ar']);

    this.translate.setDefaultLang(_SharedService.selectedLang);

  }
  ngOnInit(): void {
    this.getAllCategories();
    this._auth.userData.subscribe(() => {

      this.userData = this._auth.userData.value;
      console.log(this.userData);
    });
  }
  changeLang() {
    this.translate.use(this._SharedService.selectedLang);
    this._SharedService.setLanguage();
    // console.log(this._SharedService.selectedLang);
    window.location.reload();

  }
  open() {
    const modalRef = this.modalService.open(LoginComponent, {
      centered: true,
      size: 'lg',
    });
  }
  logout(): void {
    this._LocalStorageService.removeItem('userToken');
    this._auth.encodedToken.next('');
    this._auth.userData.next(null);
    this._auth.isLogin.next(false)
    window.location.reload();
  }
  openPlan() {
    const modalRef = this.modalService.open(PlanComponent, {
      centered: true,
      size: 'lg',
    });
  }
  getAllCategories() {
    this._SharedService.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res);
        this.allCategoriesData = res.data;

        this.parentsCategories = res.data.filter(
          (el: Category) => el.categoryParentId == null
        );
      },
    });
  }
}
