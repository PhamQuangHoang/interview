import {Component, OnInit, AfterViewInit, NgModule} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service'
import { IntervieweeService } from '../../service/interviewee.service'
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']

})
export class NavbarComponent implements OnInit,AfterViewInit {
  FilterActive :boolean = false;
  ngAfterViewInit(): void {
    document.getElementsByClassName
  }
  navOpen = false;
  state: String = 'inactive'
  fullname: string;
  role: boolean;
  constructor(private router: Router,
    private cookieService: CookieService,
    public authenticationService: AuthenticationService,
    private intervieweeService: IntervieweeService
  ) { }

  ngOnInit() {
    this.role = this.intervieweeService.getRolesSupmin();
    this.authenticationService.userCurrent().subscribe(
      (data) => {    
        if (data) {
          localStorage.setItem('fullname', data.name);
          this.fullname = localStorage.getItem('fullname');
        }
      }
    )
  }

  logout() {
    this.authenticationService.logout().subscribe(
      (data) => {
        data
        this.router.navigateByUrl('login')
        localStorage.removeItem('token');
        localStorage.removeItem('fullname');
        localStorage.removeItem('roles');
      }
    )
  }


  dropdownClicked() {
    console.log('Clicked');
  }
}
