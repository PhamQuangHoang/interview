import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interviewee } from '../models/interviewee.model';
import { IntervieweeService } from '../service/interviewee.service';
import { Constant } from '../constant/Constant'
import { log } from "util";

import * as moment from 'moment';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-interviewee-details',
  templateUrl: './interviewee-details.component.html',
  styleUrls: ['./interviewee-details.component.scss']
})
export class IntervieweeDetailsComponent implements OnInit {
  userID: any;
  itv: Interviewee;
  defaultAva = Constant.DEFAULT_AVATAR_URL;
  API = Constant.URL_API + ':' + Constant.PORT;
  techniques: Array<string>;
  role;
  // rolename;
  update_url =  '../../../500';
  constructor(private router: ActivatedRoute, private routerLink: Router,
    private intervieweeService: IntervieweeService) {
    this.userID = this.router.snapshot.params.id;
    //console.log("Id putted = " + this.userID);

  }

  ngOnInit() {
    this.role = this.intervieweeService.getRoles();
    // lấy danh sách quyền từ api /current
    this.intervieweeService.getRoleName().subscribe((res) => {
      console.log(res);
      //Kiểm tra quyền và gán đương link đến trang update với quyền phù hợp
      res.authorities.forEach(element => {
        if (element.authority === "ROLE_SUPERADMIN" && res.authorities.length == 1) {
          this.update_url = "../../../403";
          return;
        }
        if (element.authority === "ROLE_INTERVIEWER") {
          this.update_url = "../../update/" + this.userID;
          return;
        }
        if (element.authority === "ROLE_DIRECTOR") {
          this.update_url = "../../dir-update/" + this.userID;
          return;
        }
        if (element.authority === "ROLE_HR") {
          this.update_url = "../../hr-update/" + this.userID;
          return;
        }

      });
      console.log(this.update_url);
    });
    this.intervieweeService.getIntervieweeByID(this.userID).subscribe((res => {
      this.itv = res;
      console.log(res);
      //console.log("Interviewee = " + this.itv);
      this.techniques = this.techniques ? this.itv.technique.split(',') : [];
      this.itv.status = this.itv.status.replace("_", " ");
      this.techniques.forEach((item, index) => {
        this.techniques[index] = this.techniques[index].trim();
      });
    }), error => {
      console.log(error);
    });
  }


  downloadFile(folder, filename) {
    window.open([Constant.DOWNLOAD_FILE_URL, folder, filename].join("/"));
    // this.intervieweeService.downloadCvFile(folder, filename).subscribe((res) => {
    //   console.log(res);
    // });

  }

  deleteInterviewee(iModal) {
    this.intervieweeService.deleteInterviewee(this.userID).subscribe(
      (success) => {
        iModal.hide();
        this.routerLink.navigateByUrl('dashboard');
      }
    )
  }

  toDate(timeStamp) {
    var now = moment.now();

    var date = moment.unix(timeStamp / 1000);

    if ((date.year() == moment().year()) && (date.month() == moment().month())) {
      //return `Today ${date.hours()}:${date.minutes()}`;
      if (date.date() == moment().date()) {
        return date.format('[Today] hh:mm A');
      } else {
        var tomorrow = moment.unix(now / 1000).add(1, 'days');
        //console.log("Date = " + date.format("LL") + " => " + tomorrow.format("LL"));
        if ((date.year() == tomorrow.year()) && (date.month() == tomorrow.month()) && (date.date() == tomorrow.date())) {
          return date.format('[Tomorrow] hh:mm A');
        }

      }

    }
    return moment.unix(timeStamp / 1000).format("DD/MM/YYYY hh:mm A");
  }
}
