import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { IntervieweeService } from '../service/interviewee.service';
import { Interviewee } from '../models/interviewee.model';
import { ShareDataService } from '../service/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() countInterviewee : number ;
  @Input() countIncoming : number;
  isFilter: boolean;
  isUsingFilter: boolean;
  interviewees: Interviewee[] = [];
  intervieweeCount: number = 0;
  // filter data
  fullname: string;
  season: string = '';
  pos: string = '';
  status: string = '';
  role : boolean ;

  constructor(private intervieweeService: IntervieweeService,
    private shareData: ShareDataService, private router: Router) { }

  // do search when keyup.enter
  search() {
    // this.fullname = (event.target.value).trim();
    if (!this.fullname) {
      this.router.navigate([''], { queryParams: { search: null }, queryParamsHandling: 'merge' });
      return;
    }
    this.router.navigate([''], { queryParams: { search: this.fullname }, queryParamsHandling: 'merge' });
  }

  ngOnInit() {

    this.role = this.intervieweeService.getRoles();
  }

  /* searching using filter data 
  @param data : data filter from dashboard form filter  
  */
  doSearchFilter(data) {
    this.router.navigate([''], { queryParams: { filter: 'new' }, queryParamsHandling: 'merge' });
  }

  /* change null object to space */
  removeNullOrUndefine(param: string): string {
    if (param === 'null' || param === undefined || param == 'default') {
      return ('');
    }
    return param;
  }

  toogleFilter() {
    this.isFilter = !this.isFilter;
  }

}
