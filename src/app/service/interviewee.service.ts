import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { tap, catchError } from 'rxjs/operators';
import { Interviewee } from '../models/interviewee.model';
import { Constant } from '../constant/Constant'
import {Role} from "../constant/Role";
import {Router} from "@angular/router";
import {__values} from "tslib";


@Injectable({
  providedIn: 'root'
})
export class IntervieweeService {
  readonly baseUrl = Constant.URL_API + ":" + Constant.PORT + "/api";
  constructor(private http: HttpClient, private router: Router) { }

  // TEST 
  getAllInterviewee(): Observable<any> {
    return this.http.get(Constant.SEARCH_INTERVIEWEE_URL).pipe(
      tap(res => {
        res
      }),
      catchError(error => of([]))
    );
  }
  // Get user by id
  getIntervieweeByID(id): Observable<any> {
    var url = `${Constant.COMMON_URL}/interviewee/${id}`;
    return this.http.get(url).pipe(tap(data => {
      // console.log(data);
    }, (err: HttpErrorResponse)=> {
      console.log("Lỗi" + err);
    }));

  }

  /** get list interviewee pagination 
  @param page : page number
  @param limit : number of record want to show 
  */
  getInterviewee(page: number, limit: number): Observable<any> {

    return this.http.get(`${Constant.SEARCH_INTERVIEWEE_URL}?page=${page}&size=${limit}`).pipe(
      tap(res => res),
      catchError(error => of(null))
    );
  }

  /**drop intervieweee */
  deleteInterviewee(id) {
    return this.http.delete(`${Constant.COMMON_URL}/interviewee/${id}`);
  }


  /**Update interviewee of hr  by id  */
  updateInterviewee(id :number , dataObject : any): Observable<any> {
    console.log('update');
    console.log(dataObject);
    
    return this.http.put(`${Constant.UPDATE_INTERVIEWE_URL}/hr/${id}`,dataObject);
  }

  

  /**Update interviewee of hr  by id  */
  updateIntervieweeITV(id :number , dataObject : any): Observable<any> {
    console.log('update interviewer');
    console.log(dataObject);   
    return this.http.put(`${Constant.UPDATE_INTERVIEWE_URL}/itver/${id}`,dataObject);
  }
  updateIntervieweeDirector(id:number, dataObject:any): Observable<any> {
    console.log('update interviewer');
    console.log(dataObject);
    console.log();
    return this.http.put(`${Constant.UPDATE_INTERVIEWE_URL}/dir/${id}`,dataObject);
  }

  /** Search by username 
  @param name : username want to search 
  */
  searchByName(page: number, limit: number, name: string): Observable<any> {
    // if name is undefine
    if (!name.trim()) {
      return of([]);
    }
    const url = `${Constant.SEARCH_INTERVIEWEE_URL}?name=${name}&page=${page}&size=${limit}`;
    return this.http.get(url).pipe(
      tap(res => {
        console.log(url);

        console.log(JSON.stringify(res));
      }),
      catchError(error => of([]))
    );
  }

  /** Search with param (filter)
    @param fullname
   @param season
   @param type
   @param position
   @param from
   @param to
  */
  searchAllParam(name: string,
    position: string, status: string, from: string, to: string, page: number, limit: number): Observable<any> {

    const searchParamUrl = `${Constant.SEARCH_INTERVIEWEE_URL}?name=${name}&positionId=${position}&status=${status}&from=${from}&to=${to}&page=${page}&size=${limit}`;
    console.log(searchParamUrl);
    return this.http.get(searchParamUrl).pipe(
      tap(res => {
        console.log(res);
      }),
      catchError(error => of([]))
    );
  }


  //-------------------------------------------------Get filter param --------------------------------------------------


  getPositionList(): Observable<any> {
    return this.http.get(Constant.POSITION_ALL_URL).pipe(
      tap(res => {
        // console.log(JSON.stringify(res));
      }),
      catchError(error => of(error))
    );
  }

  getImage(imgUrl: string): Observable<Blob> {
    return this.http.get(imgUrl, { responseType: 'blob' });
  }

  getRoles(): boolean {
    if (localStorage.getItem("roles").includes(Role.ROLE_HR)) {
      return false;
    } else {
      return true;
    }
  }
  getRolesSupmin(): boolean {
    if (localStorage.getItem("roles").includes(Role.ROLE_SUPERADMIN)) {
      return false;
    } else {
      return true;
    }
  }

  getRoleName(): Observable<any> {
    return this.http.get(Constant.CURRENT_USER_URL).pipe(
      tap(res => {
        console.log(JSON.stringify(res));
        
      }),
      catchError(error => of(error))
    );
  }

  addInterviewee(dataObject: any): Observable<any>{
    return this.http.post(Constant.ADD_INTERVIEWEE_URL, dataObject);
  }

}
