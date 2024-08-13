import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of } from 'rxjs';
import { selectToken } from '../store/auth/auth.feature';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req)
  const router = inject(Router)
  const store = inject(Store)
  const token = store.selectSignal(selectToken)
  if (router.url.includes('/cms') && token()) {
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${token()}`
      }
    }))
  }
  return next(req)
    .pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              // redirect to login
              // router.navigateByUrl('/login')
              break;
            case 404:
              // do something
              break;
          }
        }
        return of(err)
      })
    )
};
