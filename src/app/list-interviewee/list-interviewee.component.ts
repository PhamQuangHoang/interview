import { Component, OnInit, Input } from '@angular/core';
import { IntervieweeService } from '../service/interviewee.service';
import { Interviewee } from '../models/interviewee.model';
import { Observable } from 'rxjs';
import { ShareDataService } from '../service/share-data.service';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
import { delay, distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { log } from "util";
import { forEach } from "@angular/router/src/utils/collection";
import { Constant } from '../constant/Constant'

import * as moment from 'moment';


@Component({
  selector: 'app-list-interviewee',
  templateUrl: './list-interviewee.component.html',
  styleUrls: ['./list-interviewee.component.scss']
})
export class ListIntervieweeComponent implements OnInit {
  defaultAva = Constant.DEFAULT_AVATAR_URL;
  apiAvatar = Constant.VIEW_AVATAR_URL;
  countIncoming: number;
  listInterviewee: Interviewee[];
  isSearching: boolean = false;
  searchName = '';
  searchPos = '';
  searchStatus = '';
  searchTech = '';
  searchFrom = '';
  searchTo = '';
  config: any = {
    id: 'listing_pagination',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  constructor(private intervieweeService: IntervieweeService,
    private shareDataService: ShareDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // check if is searching
    this.retriveSearchParam();
    // get all interviewee for default if not using search
    if (!this.isSearching) {
      this.getDefaultIntervieweeList();
    }

  }

  /** Funtion apply for ngx-pagination
   * @param event : page number
  **/
  pageChange(event) {
    this.config.currentPage = event;
    // if user didn't search => default (all list) will load 
    if (!this.isSearching) {
      this.intervieweeService.getInterviewee(this.config.currentPage - 1, this.config.itemsPerPage).subscribe(
        (res) => {
          this.listInterviewee = res.page.content;
          this.countIncoming = res.incoming_count;
          this.config.totalItems = res.page.totalElements;

        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      // using search
      this.doSearchFilter();
    }
  }
  /**
   * Retrives search param from url bar
   */
  retriveSearchParam() {
    this.route.queryParams.subscribe(
      param => {
        // check if some param exist 
        if (Object.keys(param).length) {
          this.isSearching = true;
          this.searchName = param.search ? param.search : '';
          this.searchStatus = param.status ? param.status : '';
          this.searchPos = param.position ? param.position : '';
          this.searchFrom = param.from ? param.from : '';
          this.searchTo = param.to ? param.to : '';

          this.doSearchFilter();

        } else {
          this.isSearching = false;
          this.listInterviewee = null;
          this.getDefaultIntervieweeList();
        }
      }
    );
  }
  /**
   * if usingSearch this will loading search list 
   */
  doSearchFilter() {
    this.intervieweeService.searchAllParam(this.searchName, this.searchPos, this.searchStatus, this.searchFrom, this.searchTo, this.config.currentPage - 1, this.config.itemsPerPage).subscribe(
      (res) => {
        this.listInterviewee = res.page.content;
        this.countIncoming = res.incoming_count;
        this.config.totalItems = res.page.totalElements;
      });
  }
  /**
   * get all interviewee 
   * -- for default if not using search or filter this function will launch
   */
  getDefaultIntervieweeList() {
    this.intervieweeService.getInterviewee(this.config.currentPage - 1, this.config.itemsPerPage).pipe(delay(1000)).subscribe(
      (res) => {
        this.listInterviewee = res.page.content;
        this.countIncoming = res.incoming_count;
        this.config.totalItems = res.page.totalElements;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  toDate(timeStamp) {
    var now = moment.now();

    var date = moment.unix(timeStamp / 1000);

    if ((date.year() == moment().year()) && (date.month() == moment().month())) {
      //return `Today ${date.hours()}:${date.minutes()}`;
      if (date.date() == moment().date()) {
        return date.format('[Today] hh:mm A');
      } else {
        var tomorrow = moment.unix(moment.now() / 1000).add(1, 'days');
        //console.log("Date = " + date.format("LL") + " => " + tomorrow.format("LL"));
        if ((date.year() == tomorrow.year()) && (date.month() == tomorrow.month()) && (date.date() == tomorrow.date())) {
          return date.format('[Tomorrow] hh:mm A');
        }

      }

    }
    return moment.unix(timeStamp / 1000).format("DD/MM/YYYY hh:mm A");
  }
}
