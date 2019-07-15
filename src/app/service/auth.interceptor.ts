import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service'
@Injectable()
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private cookieService: CookieService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tokenCurrent = localStorage.getItem('token');
        if(tokenCurrent){
            req = req.clone({
                setHeaders: 
                {
                    Authorization: tokenCurrent
                }
            })            
        }
        return  next.handle(req);
    }
}