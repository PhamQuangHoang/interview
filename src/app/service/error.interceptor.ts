import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, ReplaySubject, pipe } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service'

import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { Constant } from "../constant/Constant";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastrService,private router: Router, private cookieService: CookieService, private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
      res => {
      }
    ), catchError(err => {

      if (err.status == Constant.UNAUTHORIZED) {
        localStorage.clear();
        this.authenticationService.logout();
        this.router.navigateByUrl('/login');
      }
      else if (err.status === Constant.PAGE_NOT_FOUND) {
        this.router.navigateByUrl("/404");
      } else if (err.status == Constant.FORBIDDEN) {
        this.router.navigateByUrl('/403');
      }else if (err.status === Constant.USERNAME_EXISTS){
        if(err.error.message  === "Username already exists"){    
            this.toastService.error("<h5>Fail!!! username already exists!!!<h5>", "Notification")
        }
      } else if (err.status === Constant.SERVER_ERROR){
        this.router.navigateByUrl("/500");
      }
      console.log(err);

      const error = err.error.message || err.statusText;

      console.log("!!!Error = " + err.status);
      return throwError(error);
    }))
  }
}
