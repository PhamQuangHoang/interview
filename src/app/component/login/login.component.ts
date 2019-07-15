import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  username: any;
  password: any;
  Messages: string;
  fullname: string;
  // user;
  // hour;
  // now;
  // setupTime
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastrService,
    public authenticationService: AuthenticationService) { }

  ngOnInit() {
    
      if(localStorage.getItem('token')){
        this.authenticationService.userCurrent().subscribe(res => {
          if (!res) {
            localStorage.clear();
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('dashboard');
          }
        }, error => {
          console.log(error);
        });
      }
    
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.pattern('[a-zA-Z0-9]+$')
      ])],
    });
  }

  checkLogin(iModel) {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.authenticationService.login(this.username, this.password).subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('roles', data.role);
        this.router.navigateByUrl('dashboard');
        this.toastService.success("<h5>Login Successfully!!!<h5>", "Notification");
      },
      (err) => {
        err
        iModel.show();
      }
    );
  }
  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'pattern', message: 'Special characters are not accepted' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' },
      { type: 'pattern', message: 'Special characters are not accepted' }
    ]
  }
}
