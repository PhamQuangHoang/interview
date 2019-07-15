import { Injectable } from '@angular/core';
import { CookieService} from 'ngx-cookie-service'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IntervieweeService } from './interviewee.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private roles: IntervieweeService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token')) {
      if(this.roles.getRoles){
      return true;
      }else{
        this.router.navigateByUrl('dashboard/update/1')
        return false;
      }
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

}
