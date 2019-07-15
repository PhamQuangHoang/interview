import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IntervieweeService } from './interviewee.service';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private _router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    const role = localStorage.getItem("roles");
    console.log(role);
     
    console.log('next data');
    
    console.log(next.data.role);
    
    if(role.includes(next.data.role)){
      return true ;
    }

    // navigate to page not found 
    console.log('access denide');
    
    this._router.navigate(['403']);
    return false;
  }
}
