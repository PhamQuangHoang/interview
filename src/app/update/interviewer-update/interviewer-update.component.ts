import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageUploadComponent } from 'src/app/image-upload/image-upload.component';
import { TagsInputComponent } from 'src/app/util/tags-input/tags-input.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IntervieweeService } from 'src/app/service/interviewee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Interviewee } from 'src/app/models/interviewee.model';
import { Constant } from 'src/app/constant/Constant';
import { MainUpdateComponent } from '../main-update/main-update.component';
import { SkillComponent } from '../skill/skill.component';
import { StatusComponent } from '../status/status.component';

@Component({
  selector: 'app-interviewer-update',
  templateUrl: './interviewer-update.component.html',
  styleUrls: ['./interviewer-update.component.scss']
})
export class InterviewerUpdateComponent implements OnInit {
  @ViewChild(StatusComponent) statusComponent: StatusComponent;
  @ViewChild(SkillComponent) skillComponet: SkillComponent;
  @ViewChild(MainUpdateComponent) mainUpdateComponent: MainUpdateComponent;
  @ViewChild(TagsInputComponent) tagInputComponent: TagsInputComponent;

  userID;
  status: string;
  mainData: any;
  TNEData: any;


  constructor(private toastService: ToastrService,
    private intervieweeService: IntervieweeService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sendDataToChild();
  }

  sendDataToChild() {

    this.userID = this.route.snapshot.params.id;
    this.intervieweeService.getIntervieweeByID(this.userID).subscribe((res) => {
      console.log('get data');
      
      console.log(res);
      
      this.mainUpdateComponent.initForm(res);
      this.statusComponent.setDefaultStatus(res.status);
      console.log(res.technique);

      this.skillComponet.setDefaultData(res.interviewerNote, res.englishSkill, res.technique);
    });
  }

  // call to main-update component to validate all information
  onSubmit() {
    this.mainUpdateComponent.onSubmit();
  }

  submitForm() {
    // make sure the image is encode for base 64 cause the event will not emit if user dont change anything on main-update component
    this.mainUpdateComponent.emitEvent();

    this.mainData.status = this.status;   
    
    const sendObject = { ... this.mainData, ...this.TNEData };  
    console.log(this.TNEData.invalid);
    console.log('itv update');
    
    console.log(sendObject);
    
 
    
    this.intervieweeService.updateIntervieweeITV(this.userID, sendObject).subscribe(
      (res) => {
        this.router.navigateByUrl('dashboard/interviewee/' + this.userID);
        this.toastService.success("<h5>Update Successfully!!!<h5>", "Notification");
        console.log('submited');
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**----------------------------------------------------Retrive data from child ---------------------------------------------- */
  retriveFormData(event: any) {
    this.mainData = event;
      
  }
  retriveStatus(event: any) {
    this.status = event;
  }

  retriveTNE(event: any) {      
    this.TNEData = event;
  }
  /**----------------------------------------------------Retrive data from child ---------------------------------------------- */


  formatDate(date) {
    return date.split("/").join("-");
  }

  ToLocalDate(utcSeconds) {

    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds)
    return d.toLocaleString();
  }


}