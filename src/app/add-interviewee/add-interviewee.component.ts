import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IntervieweeService } from '../service/interviewee.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { Interviewee } from '../models/interviewee.model'
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { TagsInputComponent } from '../util/tags-input/tags-input.component';
import { ToastrService } from 'ngx-toastr'
import { Constant } from '../constant/Constant'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-interviewee',
  templateUrl: './add-interviewee.component.html',
  styleUrls: ['../add-interviewee/add-interviewee.component.scss']
})

export class AddIntervieweeComponent implements OnInit {
  @ViewChild(ImageUploadComponent) imageUpload: ImageUploadComponent;
  @ViewChild(TagsInputComponent) tagComponent: TagsInputComponent;

  formAdd: FormGroup;
  positionList;
  interviewee: Interviewee[] = [];
  files: any;
  filesName: "";
  submited = false;
  avatar: any = Constant.DEFAULT_AVATAR_URL;
  constructor(private formBuilder: FormBuilder, private toastService: ToastrService,
    private intervieweeService: IntervieweeService,private router: Router) { }
  ngOnInit() {
    this.intervieweeService.getPositionList().subscribe(
      data => {
        this.positionList = data;
      }
    )

    this.formAdd = this.formBuilder.group({
      fullname: ['', Validators.required],
      birthday: ['',Validators.required],
      gender: ['',Validators.required],
      cv: [''],
      address: [''],
      // avatar: ['', Validators.required],
      phoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+.$')
      ])],
      timeInterview: ['',Validators.required],
      placeInterview: [''],
      positionId: ['', Validators.required]
    });

  }

  addIntervieww() {
    this.submited = true;
    if (!this.formAdd.invalid) {
      var sendObject = this.formAdd.value;
      sendObject.cv = this.files ? this.files[0].base64 : '';
      // console.log(this.files);
      sendObject.gender = sendObject.gender == 'female' ? true : false;
      // console.log(sendObject.time_interview);
      sendObject = { ...sendObject, ...{ avatar: (this.imageUpload.croppedImage != this.avatar) ? this.imageUpload.croppedImage : "" }, ...{ ...{ status: "INCOMING" } } };
      sendObject.timeInterview = this.unixtimestamp(sendObject.timeInterview);
      console.log(sendObject.technique);
      // sendObject.birthday = this.formatDate(sendObject.birthday);
      console.log(sendObject);
      console.log(JSON.stringify(sendObject));
      this.intervieweeService.addInterviewee(sendObject).subscribe(
        (res) => {
          console.log(res);
          this.toastService.success("<h5>Adding successfully!!!<h5>", "Notification");
          this.router.navigateByUrl('dashboard')
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  add_validation_messages = {
    'fullname': [
      { type: 'required', message: 'Username is required' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' },
      { type: 'pattern', message: 'Email is invaild' }
    ],
    'phoneNumber': [
      { type: 'required', message: 'Phone Number is required' },
      { type: 'pattern', message: '' },
      { type: 'minlength', message: 'Phone Number need length 10 and only number' },
      { type: 'maxlength', message: 'Phone Number need length 10 and only number' },

    ],
    'timeInterview': [
      { type: 'required', message: 'Time Interview is required' }
    ],
    'birthday': [
      { type: 'required', message: 'Birthday is required' }
    ],
    'gender': [
      { type: 'required', message: 'Gender is required' }
    ],
    'positionId': [
      { type: 'required', message: 'Position is required' }
    ],
  }
  formatDate(date) {
    return date.split("/").join("-");
  }
  onFileChanges(file) {
    console.log(file);
    this.filesName = file[0].name;
  }
  unixtimestamp(time): number {
    // reverse datetime to m/d/y
    let timeRevert = time.split('/');
    let temp = timeRevert[0];
    timeRevert[0] = timeRevert[1];
    timeRevert[1] = temp;
    timeRevert = timeRevert.join('/');
    console.log(timeRevert);
    return (new Date(timeRevert)).getTime();
  }
}
