import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router)

  const clonedRequest = req.clone({
    withCredentials : true
  })

  return next(clonedRequest).pipe(
    catchError((err : HttpErrorResponse) =>{
      if(err.status === 401){
        localStorage.removeItem("authToken");
         router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
