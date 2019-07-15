import {Constant} from '../constant/Constant';

export class Interviewee {
    id: number;
    fullname: string;
    birthday : string;
    gender: boolean;
    email: string;
    address: string;
    phone_number: number;
    interviewerNote: string;
    directorNote : string;
    status: string;
    cv: string;
    avatar: string;
    technique: string;
    season_name: string;
    place_interview : string;
    position: any;
    time_interview: string;
    englishSkill : string;
    user : Array<any> ;

    constructor() {
      this.id = 0;
      this.fullname = "";
      this.avatar = "";
      this.position = {'id': 0, 'name': ''};
    }

}
