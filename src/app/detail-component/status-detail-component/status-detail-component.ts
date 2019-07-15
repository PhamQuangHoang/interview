import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-component',
  templateUrl: './status-detail-component.html',
  styleUrls: ['./status-detail-component.scss']
})
export class StatusDetailComponent implements OnInit {

  status: string;
  statusText: string;

  constructor() { }

  ngOnInit() {
  }

  setStatus(status){
    this.status = status;
    this.statusText = this.status != null ? this.status.split('_').join(' ') : '';
    console.log(this.status + ' ; ' + this.statusText);
  }
}
