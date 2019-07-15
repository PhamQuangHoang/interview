import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interviewee } from '../../models/interviewee.model';
import { IntervieweeService } from '../../service/interviewee.service';
import { Constant } from '../../constant/Constant'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DirectorStatusComponent } from '../director-status/director-status.component';
import { log } from 'util';
import { CardTopComponent } from 'src/app/detail-component/card-top/card-top.component';


@Component({
  selector: 'app-director-update',
  templateUrl: './director-update.component.html',
  styleUrls: ['./director-update.component.scss']
})
export class DirectorUpdateComponent implements OnInit {
  @ViewChild(DirectorStatusComponent) directorStatusComponent: DirectorStatusComponent;
  @ViewChild(CardTopComponent) cardTopComponent: CardTopComponent;
  
  userID: any;
  itv: Interviewee = new Interviewee();
  defaultAva = Constant.URL_API + ":" + Constant.PORT + '/api/view/avatar/default';
  API = Constant.URL_API + ':' + Constant.PORT;
  techniques: Array<string>;
  role;
  status: string;
  updateForm: FormGroup;
  constructor(private router: ActivatedRoute, private routerLink: Router,
    private intervieweeService: IntervieweeService, private FB: FormBuilder,
    private FbU: FormBuilder, private toastService: ToastrService) {
    this.userID = this.router.snapshot.params.id;
    console.log("Id putted = " + this.userID);
  }

  ngOnInit() {
    this.role = this.intervieweeService.getRoles()
    this.intervieweeService.getIntervieweeByID(this.userID).subscribe((res => {
      this.itv = res;
      this.status = res.status;
      this.directorStatusComponent.setDefaultValue(res.status);
      this.cardTopComponent.setInfo(this.itv.id, this.itv.avatar, this.itv.fullname);
      //console.log("Interviewee = " + this.itv);
      this.techniques = this.itv.technique != null ? this.itv.technique.split(',') : [];
      this.techniques.forEach((item, index) => {
        this.techniques[index] = this.techniques[index].trim();
      });
    }), error => {
      console.log(error);
    });
    // this.statusForm = this.FB.group({
    //     status: ['']
    // });
    this.updateForm = this.FbU.group({
      directorNote: ['', Validators.maxLength(200)]
    });

  }
  validation_messages={
    'directorNote': [
      { type: 'maxlength', message: 'Note need length smaller than 200' }
    ],
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

    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(timeStamp / 1000)
    return d.toLocaleString();
  }
  // changeStatus(value) {
  //   this.statusColor = value;
  // }

  // get status() {
  //   return this.statusForm.controls['status'];
  // }

  retriveStatus(status: string) {
    console.log(status);
    this.status = status;
  }

  onSubmit() {
    if (!this.updateForm.invalid) {
    var sendObject = this.updateForm.value;
    sendObject.status = this.status;
    console.log(sendObject);
    this.intervieweeService.updateIntervieweeDirector(this.userID, sendObject).subscribe(
      (success) => {
        this.routerLink.navigateByUrl('dashboard/interviewee/' + this.userID);
        this.toastService.success("<h5>Successfully!!!<h5>", "Notification");
      }
    )
  }
}
}
