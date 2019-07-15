import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

import { IntervieweeDetailsComponent } from './interviewee-details/interviewee-details.component';

import { AuthGuard } from './service/auth.guard';
import { AddIntervieweeComponent } from './add-interviewee/add-interviewee.component';
import { HrUpdateIntervieweeComponent } from './update/hr-update-interviewee/hr-update-interviewee.component';
import { InterviewerUpdateComponent } from './update/interviewer-update/interviewer-update.component';
import { RoleGuard } from './service/role.guard';
import { DirectorUpdateComponent } from './update/director-update/director-update.component';
import { ForbiddenComponent } from './component/forbidden/forbidden.component';
import{ UserLogsComponent} from './user-logs/user-logs.component';
import { InternalServerErrorComponent } from './component/internal-server-error/internal-server-error.component';

const routes: Routes = [
  {
    path: 'dashboard', component: LayoutComponent, children: [
      {
        path: '', component: DashboardComponent, canActivate: [AuthGuard]
      },
      {
        path: 'user', component: UserManagerComponent, canActivate: [AuthGuard]
      },
      {
        path: "interviewee/:id", component: IntervieweeDetailsComponent, canActivate: [AuthGuard]
      },
      {
        path: "update/:id", component: InterviewerUpdateComponent, canActivate: [RoleGuard], data: { role: 'ROLE_INTERVIEWER' }
      },
      {
        path: "hr-update/:id", component: HrUpdateIntervieweeComponent, canActivate: [RoleGuard], data: { role: 'ROLE_HR' }
      },
      {
        path: "dir-update/:id", component: DirectorUpdateComponent, canActivate: [RoleGuard], data: { role: 'ROLE_DIRECTOR' }
      },
      {
        path: "add", component: AddIntervieweeComponent, canActivate: [AuthGuard]
      },
      {
        path: "logs", component:UserLogsComponent , canActivate: [AuthGuard]
      }

    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]
  },
  {
    path: '404', component: PageNotFoundComponent
  },
  {
    path: '403', component: ForbiddenComponent
  },
  {
    path: '500', component: InternalServerErrorComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
