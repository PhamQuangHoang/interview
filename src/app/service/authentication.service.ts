import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model'
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import { Constant } from '../constant/Constant'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private cookieService: CookieService, private http: HttpClient) { }
  logout(): Observable<any> {
    return this.http.get(Constant.LOGOUT_URL)
      .pipe(tap(
        (res) => {
          res
        }
      ),
        catchError(err => of(err))
      )
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(Constant.LOGIN_URL, { "username": username, "password": password })
      .pipe(tap(
        (res) => {
        }
      ))
  }
  userCurrent(): Observable<any> {
    return this.http.get<any>(Constant.CURRENT_USER_URL)
      .pipe(tap(
        (res) => {
          
        }
      ), catchError(err => of(err)

      ))
  }
}
