import { Component, OnInit } from '@angular/core';
import { Constant } from '../../constant/Constant';

@Component({
  selector: 'app-card-top',
  templateUrl: './card-top.component.html',
  styleUrls: ['./card-top.component.scss']
})
export class CardTopComponent implements OnInit {

  defaultAva = 'assets/image/default_avatar.jpg';
  API = Constant.URL_API + ':' + Constant.PORT;

  avatar: string;
  id: number;
  fullname : string;

  constructor() { }

  ngOnInit() {
  }

  setInfo(id:number, avatar: string, fullname: string){
    this.avatar = avatar;
    this.id = id;
    this.fullname = fullname;
  }
}
