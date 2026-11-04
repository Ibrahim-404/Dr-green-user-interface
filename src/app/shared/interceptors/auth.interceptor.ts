import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../features/services/auth.service';
import { SharedService } from '../services/shared.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _Auth = inject(AuthService);
  const _shared= inject(SharedService);

  let authToken: any = '';
  _Auth.encodedToken.subscribe((res) => {
    authToken = res;
  });
  // console.log('authToken', authToken);
  const lang = _shared.selectedLang;

  const authHeaders =
    authToken !== ''
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${JSON.parse(authToken) }`,
            'Accept-Language': `${lang}`,
          },
        })
      : req.clone({
          setHeaders: {
            'Accept-Language': `${lang}`,
          },
        });
  return next(authHeaders).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // console.log('Unauthorized request:', err);
        } else {
          // console.log('HTTP error:', err);
        }
      } else {
        // console.log('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
