import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.development';
import { user, userModel } from '../../pages/profile/profile/profile.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: String = environment.baseURL;

  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  encodedToken: BehaviorSubject<any> = new BehaviorSubject(null);
  verifyCode:any
  forgetPassword :any;
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user:user=new userModel();

  constructor(
    private _http: HttpClient,
    private _localStorage: LocalStorageService
  ) {

    // if (_localStorage.getItem('userToken') !== null) {
    if (_localStorage.getItem('userToken') != null) {

      this.isLogin.next(true);
      let encoded = JSON.stringify(_localStorage.getItem('userToken'));
      this.encodedToken.next(JSON.parse(encoded));
      let decoded = jwtDecode(encoded);
      this.userData.next(decoded);

    }else{
      this.isLogin.next(false);
    }



  }

  postLogin(data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}api/Auth/login`, data);
  }
  postRegister(data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}api/Auth/Register`, data);
  }
  postForgetPassword(data: any): Observable<any> {
    return this._http.post(
      `${this.baseUrl}api/Auth/ForgetPasswordSendCodeByEmail`,
      data
    );
  }
  postVerificationCode(data: any): Observable<any> {

    return this._http.post(`${this.baseUrl}api/Auth/ResetPasswordCode`, data);
  }
  postChangePassWithCode(data: any): Observable<any> {

    return this._http.post(`${this.baseUrl}api/Auth/ChangePasswordWithCode`, data);
  }
}
