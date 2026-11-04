import { HttpInterceptorFn } from '@angular/common/http';

export const pagesInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
