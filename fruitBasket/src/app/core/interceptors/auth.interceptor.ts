import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router)

  const token = localStorage.getItem("authToken");

  const clonedRequest = req.clone({
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
  })

  return next(clonedRequest).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");

        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
