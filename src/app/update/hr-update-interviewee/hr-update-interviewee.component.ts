
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IntervieweeService } from '../../service/interviewee.service';
import { RouterLinkActive, ActivatedRoute, Router } from '@angular/router';
import { Interviewee } from '../../models/interviewee.model';
import { ImageUploadComponent } from '../../image-upload/image-upload.component';
import { TagsInputComponent } from '../../util/tags-input/tags-input.component';
import { ToastrService } from 'ngx-toastr'
import { Constant } from '../../constant/Constant'
import { StatusComponent } from '../status/status.component';
import { SkillComponent } from '../skill/skill.component';
import { MainUpdateComponent } from '../main-update/main-update.component';
@Component({
  selector: 'app-hr-update-interviewee',
  templateUrl: './hr-update-interviewee.component.html',
  styleUrls: ['./hr-update-interviewee.component.scss']
})

/* Oninit => got data from main-update 
   send data to status component
   send data to skill component
   on Data change of main-update compoment  => retrive all data and wait for submit 
*/
export class HrUpdateIntervieweeComponent implements OnInit {
  @ViewChild(MainUpdateComponent) mainUpdateComponent: MainUpdateComponent;


  userID;
  mainData: any;
  dataObj: any;
  techniques: string;
  constructor(private toastService: ToastrService,
    private intervieweeService: IntervieweeService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sendDataToChild();
  }
  // Set data to all child component 
  sendDataToChild() {
    this.userID = this.route.snapshot.params.id;
    this.intervieweeService.getIntervieweeByID(this.userID).subscribe((res) => {
      console.log(res);

      this.dataObj = res;
      this.mainUpdateComponent.initForm(res);
      this.techniques = res.technique;
    });
  }


  // call to main-update component to validate all information
  onSubmit() {
    this.mainUpdateComponent.onSubmit();
  }


  submitForm() {
    // make sure the image is encode for base 64 cause the event will not emit if user dont change anything on main-update component
    this.mainUpdateComponent.emitEvent();

    this.mainData.status = this.dataObj.status;
    this.mainData.technique = this.techniques;
    this.mainData.englishSkill = this.dataObj.englishSkill;
    this.mainData.interviewNote = this.dataObj.interviewNote;
    const sendObject = this.mainData;
    console.log('hr-update');

    console.log(this.mainData);

    this.intervieweeService.updateInterviewee(this.userID, sendObject).subscribe(
      (res) => {
        this.router.navigateByUrl('dashboard/interviewee/' + this.userID);
        this.toastService.success("<h5>Update Successfully!!!<h5>", "Notification");
      },
      (err) => {
        console.log(err);
      }
    );
  }



  /**----------------------------------------------------Retrive data from child ---------------------------------------------- */
  retriveTag(event: any) {
    this.techniques = event;
    console.log(this.techniques);
  }

  retriveFormData(event: any) {
    this.mainData = event;
    console.log('main');
    console.log(event);
  }
  /**----------------------------------------------------Retrive data from child ---------------------------------------------- */

  formatDate(date) {
    return date.split("/").join("-");
  }


}
