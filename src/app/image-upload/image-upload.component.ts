import { Component, OnInit, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { IntervieweeService } from '../service/interviewee.service';
import { Constant } from '../constant/Constant';
import { from } from 'rxjs';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  // url includes exist image of interviewee 
  @Input() existImgUrl;
  defaultAvatar = Constant.DEFAULT_AVATAR_URL;
  croppedImage: any = this.defaultAvatar;
  imageChangedEvent: any = '';
  canCroped: boolean = false;
  constructor(private intervieweeService: IntervieweeService) { }

  ngOnInit(): void {
    this.getImageFromService();
  }

  // input file change event 
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.canCroped = true;
  }

  // create base64 image 
  createImageFromBlob(image: Blob) {
    //console.log(image.type);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.croppedImage = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  // get image from api
  getImageFromService() {
    this.intervieweeService.getImage(this.existImgUrl).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log('No image found on serve or link is empty' + error);
    });
  }

}
