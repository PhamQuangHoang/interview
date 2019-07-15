import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { ListIntervieweeComponent } from './list-interviewee/list-interviewee.component';
import { IntervieweeDetailsComponent } from './interviewee-details/interviewee-details.component';
import { ListGhostComponent } from './list-interviewee/list-ghost/list-ghost.component';
import { TagsInputComponent } from './util/tags-input/tags-input.component';

import { AuthGuard } from './service/auth.guard';
import { AuthenticationService } from './service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './service/auth.interceptor';
import { ErrorInterceptor } from './service/error.interceptor';
import { AddIntervieweeComponent } from './add-interviewee/add-interviewee.component';
import { HrUpdateIntervieweeComponent } from './update/hr-update-interviewee/hr-update-interviewee.component';
import { StatusComponent } from './update/status/status.component';
import { SkillComponent } from './update/skill/skill.component';
import { InterviewerUpdateComponent } from './update/interviewer-update/interviewer-update.component';
import { MainUpdateComponent } from './update/main-update/main-update.component';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { ContainerComponent } from './detail-component/container/container.component';

import { DirectorUpdateComponent } from './update/director-update/director-update.component';

import { ForbiddenComponent } from './component/forbidden/forbidden.component';
import { DirectorStatusComponent } from './update/director-status/director-status.component';
import { StatusDetailComponent } from './detail-component/status-detail-component/status-detail-component';
import { CardTopComponent } from './detail-component/card-top/card-top.component';
import { InternalServerErrorComponent } from './component/internal-server-error/internal-server-error.component';


export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { velocity: 0.4, threshold: 20 },
    'pinch': { enable: false },
    'rotate': { enable: false } // override default settings
  }
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    DashboardComponent,
    UserManagerComponent,
    LoginComponent,
    PageNotFoundComponent,
    SearchComponent,
    IntervieweeDetailsComponent,
    ListIntervieweeComponent,
    ImageUploadComponent,
    ListGhostComponent,
    TagsInputComponent,
    AddIntervieweeComponent,
    HrUpdateIntervieweeComponent,
    StatusComponent,
    SkillComponent,
    InterviewerUpdateComponent,
    MainUpdateComponent,
    UserLogsComponent,
    ContainerComponent,

    DirectorUpdateComponent,
    ForbiddenComponent,
    DirectorStatusComponent,
    StatusDetailComponent,
    CardTopComponent,
    InternalServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    FlatpickrModule.forRoot(),
    ImageCropperModule,
    AlifeFileToBase64Module,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      progressAnimation: "increasing",
      timeOut: 2000,
    })

  ],
  providers: [
    AuthGuard, AuthenticationService, CookieService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
