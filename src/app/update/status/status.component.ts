import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['../hr-update-interviewee/hr-update-interviewee.component.scss']
})
export class StatusComponent implements OnInit {
  @Output() statusChange = new EventEmitter<string>();

  statusColor: any;
  constructor(private fb: FormBuilder) { }
  statusForm: FormGroup;

  ngOnInit() {
    // if change data in form => send value object to Parent component 
  }
  formData(): any {
    const data = this.statusForm.value;
    return data;
  }

  setDefaultStatus(status) {
    this.statusForm = this.fb.group({
      status: [status]
    });
    this.statusColor = status;
    this.statusForm.valueChanges.subscribe((data) => {
      console.log(this.formData().status);
      this.statusChange.emit(this.formData().status);
    });
    this.statusChange.emit(this.formData().status);
  }
  changeStatus(value) {
    this.statusColor = value;
  }

  get status() {
    return this.statusForm.controls['status'];
  }
}
