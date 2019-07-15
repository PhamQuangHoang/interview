import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Constant } from '../constant/Constant'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiURL = Constant.URL_API + ":" + Constant.PORT + '/api';
  readonly userLogUrl = Constant.USER_LOGS_URL;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  counterUrl = 'http://localhost:3000/user_count';
  getUserCount(): Observable<any> {
    return this.http.get(this.counterUrl).pipe(tap(res => console.log(res)));
  }


  //GET method => fetch user data
  getUserByPage(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/user?page=${page}&size=${limit}`).pipe(
      tap(res => res),
      catchError(error => of(null)),
    );
  }
  //DELETE method => delete user
  deleteUser(id): Observable<any> {
    return this.http.delete(this.apiURL + "/user/delete/" + id).pipe(
      tap(res => res),
      catchError(error => of(null)),

    );
  }
  //POST method => create user
  createUser(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/user/add', user)
  }
  //PUT method => update user
  updateUser(id, user): Observable<User> {
    return this.http.put<User>(this.apiURL + '/user/update/' + id, user).pipe(
      tap(res => console.log(res),
        catchError(error => of(new User))
      ));
  }

  // Search with param nickname  

  searchByUserName(name): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/user?nickname_like=${name}`).pipe(
      tap(res => console.log(res)),
      catchError(err => of([]))
    )
  }

  // Search with param nickname  
  searchByserEmail(email): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/user?email_like=${email}`).pipe(
      tap(res => res),
      catchError(err => of([]))
    )
  }
  getIdroles() {
    return this.http.get(this.apiURL + '/roles')
  }

  getUserLogs(page: number, size: number): Observable<any> {
    //console.log("Requesting to " + `${this.userLogUrl}?page=${page}&size=${size}`)
    return this.http.get(`${this.userLogUrl}?page=${page}&size=${size}`).pipe(
      tap(res => (res)),
      catchError(err => of(err))
    );
  }
}
