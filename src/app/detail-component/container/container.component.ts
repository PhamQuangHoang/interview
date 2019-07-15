import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interviewee } from '../../models/interviewee.model';
import { IntervieweeService } from '../../service/interviewee.service';
import { Constant } from '../../constant/Constant';
import * as moment from 'moment';
import { StatusDetailComponent } from '../status-detail-component/status-detail-component';
import { CardTopComponent } from '../card-top/card-top.component';
import { Role } from 'src/app/constant/Role';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() update_url : any;
  @ViewChild(StatusDetailComponent) statusDetailComponent: StatusDetailComponent; 
  @ViewChild(CardTopComponent) cardTopComponent: CardTopComponent;

  userID: any;
  itv: Interviewee = new Interviewee();
  defaultAva = Constant.URL_API + ":" + Constant.PORT + '/api/view/avatar/default';
  API = Constant.URL_API + ':' + Constant.PORT;
  techniques: Array<string>;

  constructor(private router: ActivatedRoute, private routerLink: Router,
    private intervieweeService: IntervieweeService) {
    this.userID = this.router.snapshot.params.id;

  }

  ngOnInit() {
    
    this.intervieweeService.getIntervieweeByID(this.userID).subscribe((res => {
      this.itv = res;
      this.statusDetailComponent.setStatus(this.itv.status);
      this.cardTopComponent.setInfo(this.itv.id, this.itv.avatar, this.itv.fullname);

      //console.log("Interviewee = " + this.itv);
      // this.techniques =  this.itv.technique.split(',').length > 1  ? this.itv.technique.split(',') : [];
      this.techniques = this.itv.technique != null ? this.itv.technique.split(',') : [];
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
