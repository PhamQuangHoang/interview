import {Component, ElementRef, OnInit} from '@angular/core';
import { UserService } from '../service/user.service';
import { IntervieweeService } from '../service/interviewee.service';
import { Log } from '../models/log.model';
import * as moment from 'moment';
import {Status} from '../constant/Status';
import { Constant } from '../constant/Constant';
import {Interviewee} from '../models/interviewee.model';
import {delay, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {__await} from 'tslib';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['../user-manager/user-manager.component.scss']
})
export class UserLogsComponent implements OnInit {

  list_of_logs: Log[];
  currentInterviewee: Interviewee;
  color = {};
  config = {
    id: 'list_logs',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  div: any;
  test: string = `<img src="${Constant.DEFAULT_AVATAR_URL}"/>`;

  constructor(private userSerive: UserService, private intervieweeService: IntervieweeService) {
  }

  ngOnInit() {
    this.loadLogs();
    this.currentInterviewee = new Interviewee();
    this.currentInterviewee.avatar = null;
    this.currentInterviewee.fullname = "";
  }

  loadLogs(page = Constant.DEFAULT_PAGE, size = Constant.DEFAULT_SIZE) {
    //Page start at zero
    this.userSerive.getUserLogs(page, size).subscribe(data =>{
      this.list_of_logs = data.content;
      this.config.totalItems = data.totalElements;
      this.config.itemsPerPage = size;
      //Handle data
      this.list_of_logs.forEach((item, index) => {
        //Convert unix time to date
        var diff_time = moment.unix(item.date / 1000).fromNow();
        if (diff_time.includes("seconds")) {
          this.list_of_logs[index].date = "Just now";
        } else if (diff_time.includes("hours") || diff_time.includes("minutes") || (diff_time.includes("hour")) || diff_time.includes("minute")) {
          this.list_of_logs[index].date = diff_time.toUpperCase().charAt(0) + diff_time.slice(1);
        } else {
          //console.log(diff_time);
          this.list_of_logs[index].date = moment.unix(item.date / 1000).format("DD/MM/YYYY HH:MM");
        }

        var currentItem = this.list_of_logs[index];

        currentItem.whichInterviewee = item.whichInterviewee;


        currentItem.whichUser = item.whichUser;
        //currentItem.action = item.content.substring(0, 7); //Create or updated
        currentItem.content = item.content;
        switch (currentItem.content) {
          case 'updated':
            currentItem.status = item.status.replace("_", " ");
            break;
          case 'added':
            currentItem.status = null;
            break;
          default:
            currentItem = null;
        }
        //currentItem.whichInterviewee = item.content.substring(item.content.indexOf("'")+1, item.content.lastIndexOf("'"));
        if (currentItem.status) {
          switch (currentItem.status) {
            case Status.PASSED:
              currentItem.color_badge = 'text-success';
              break;
            case Status.FAILED:
              currentItem.color_badge = 'text-danger';
              break;
            case Status.ON_HOLD:
              currentItem.color_badge = 'text-warning';
              break;
            case Status.INCOMING:
              currentItem.color_badge = 'text-info';
              break;
            default:
              currentItem.color_badge = 'text-secondary';
          }
        }
      })
    });
  }

  pageChange(event) {
    this.config.currentPage = event;
    this.loadLogs(event-1);
  }


  getInterviewee(itvId) {
    //Load interviewee by id
    this.intervieweeService.getIntervieweeByID(itvId).subscribe(data => {
      delay(500);
      this.currentInterviewee = data;
      this.test = this.currentInterviewee.avatar ? ('<img width="100%" src="' + [Constant.VIEW_AVATAR_URL, this.currentInterviewee.id, this.currentInterviewee.avatar].join("/") +'"/>') : null;
      //console.log("Avatar:" + this.test);
    }, error => of(error));

  }
}
