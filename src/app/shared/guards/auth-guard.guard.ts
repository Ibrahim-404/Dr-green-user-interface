import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../features/services/auth.service';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../features/components/login/login.component';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  constructor(private _AuthService:AuthService,private _Router:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._AuthService.userData.getValue()!=null){
        return true;

      }else{
          this.modalService.open(
            LoginComponent,{
              centered: true,
              size: 'lg',
            }
          )
        return false;
      }

  }

}
