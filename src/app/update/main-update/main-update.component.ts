import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ImageUploadComponent } from 'src/app/image-upload/image-upload.component';
import { Interviewee } from 'src/app/models/interviewee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IntervieweeService } from 'src/app/service/interviewee.service';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'src/app/constant/Constant';

@Component({
  selector: 'app-main-update',
  templateUrl: './main-update.component.html',
  styleUrls: ['../hr-update-interviewee/hr-update-interviewee.component.scss']
})
export class MainUpdateComponent implements OnInit {
  @ViewChild(ImageUploadComponent) imageUpload: ImageUploadComponent;
  @Output() formData = new EventEmitter<any>();
  @Output() SubmitForm = new EventEmitter();
  techniquesSelected;
  positionsList: any;
  technique: string;
  userID: any;
  files: any;
  rawFiles: any;
  filesName = 'Select your files!';
  submited = false;
  avatar: any = Constant.URL_API + ':' + Constant.PORT + '/api/view/avatar/default';
  formUpdate: FormGroup;
  constructor(private formbuilder: FormBuilder, private toastService: ToastrService,
    private intervieweeService: IntervieweeService,
    private router: ActivatedRoute) { }


  ngOnInit() {
    // get position list and apply to select
    this.intervieweeService.getPositionList().subscribe(
      data => {
        this.positionsList = data;
        console.log(data);
      });
  }

  initForm(res: any) {
    // send back to parent for defaut
    this.formData.emit(res);

    this.technique = res.technique;
    const avatarBaseUrl = Constant.URL_API + ":" + Constant.PORT + `/api/view/${res.id}/`;
    this.avatar = res.avatar ? avatarBaseUrl + res.avatar : this.avatar;
    this.filesName = res.cv ? res.cv : this.filesName;

    this.formUpdate = this.formbuilder.group({
      fullname: [res.fullname, Validators.required],
      birthday: [res.birthday, Validators.required],
      gender: [res.gender, Validators.required],
      address: [res.address],
      phoneNumber: [res.phone_number, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ])],
      email: [res.email, Validators.compose([
        Validators.required,
        Validators.email])],
      timeInterview: [res.time_interview],
      placeInterview: [res.place_interview],
      positionId: [res.position.id]
    });
    // if change data in form => send value object to Parent component 
    this.formUpdate.valueChanges.subscribe((data) => {
      this.emitEvent();
    });
  }


  // submit your form if all feild is valid 
  onSubmit() {
    this.submited = true;
    if (this.files) {
      if (this.files[0].type !== 'application/pdf') {
        //Notify here
        alert("Wrong file type. We just accept the pdf file!");
        return;
      }
    }
    if (this.formUpdate.valid) {
      this.SubmitForm.emit();
    }
  }


  // send data if some thing change on form 
  emitEvent() {
    this.formData.emit(this.sendData());
  }

  // file encode go here
  onFileChanges(file) {
    console.log(file);
    this.filesName = file[0].name;
    this.emitEvent();
  }


  sendData() {
    var sendObject = this.formUpdate.value;
    // convert to timestamp
    sendObject.timeInterview = this.unixtimestamp(sendObject.timeInterview);

    sendObject.cv = this.files ? this.files[0].base64 : '';
    sendObject = {
      ...sendObject, ...{ avatar: this.imageUpload.croppedImage }, ...{ usersId: [] }
    };
    return sendObject;
  }

  unixtimestamp(time): number {
    return (new Date(time)).getTime();
  }
  update_validation_messages = {
    'fullname': [
      { type: 'required', message: 'Fullname is required' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' },
      { type: 'email', message: 'Email is invaild' }
    ],
    'phoneNumber': [
      { type: 'required', message: 'Phone Number is required' },
      { type: 'pattern', message: 'Phone Number need length 10 and only number' },
      { type: 'minlength', message: 'Phone Number need length 10 and only number' },
      { type: 'maxlength', message: 'Phone Number need length 10 and only number' },

    ],
    
  }
}
