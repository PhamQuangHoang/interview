import { Component, OnInit, Output, EventEmitter, Input, Directive } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IntervieweeService } from 'src/app/service/interviewee.service';
import { Interviewee } from 'src/app/models/interviewee.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-director-status',
  templateUrl: './director-status.component.html',
  styleUrls: ['./director-status.component.scss']
})
export class DirectorStatusComponent implements OnInit {
  @Output() statusEvent = new EventEmitter<string>();
  statusColor: any;
  statusForm: FormGroup;
  userID: any;
  status: string;
  itv: Interviewee;

  constructor(private router: ActivatedRoute, private FB: FormBuilder, private intervieweeService: IntervieweeService) { }
  ngOnInit() {
    this.statusForm = this.FB.group({
      status: ['']
    });

  }
  setDefaultValue(event: string) {
    this.status = event;
    this.statusForm = this.FB.group({
      status: [this.status]
    });
    this.changeStatus(this.status);

  }

  public eventEmit(status) {
    this.statusEvent.emit(status);
  }

  changeStatus(value) {
    this.statusColor = value;
    this.eventEmit(value);
  }

  get getStatus() {
    return this.statusForm.controls['status'];
  }

}

