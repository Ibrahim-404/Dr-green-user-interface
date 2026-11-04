import { AuthService } from './features/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from './services/local-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drgreen';
  constructor(private _localStorage: LocalStorageService,_AuthService:AuthService) {

    if (_localStorage.getItem('userToken') != null) {
      let cartona: any = this._localStorage.getItem('userToken');
      _AuthService.encodedToken.next(cartona);
      // this.encodedToken.next(JSON.parse(cartona));
      _AuthService.userData.next(jwtDecode( _AuthService.encodedToken.value));
      // console.log('this.userData.value',_AuthService.userData.value);
      // console.log('this.encodedToken.value', this.encodedToken.value);
    }else{
      _AuthService.userData.next(null);
      _AuthService.encodedToken.next(null);
    }
  }


}
