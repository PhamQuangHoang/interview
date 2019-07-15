import {User} from './User.model';
import {Interviewee} from './interviewee.model';

export class Log {
  id: number;
  content: string;
  date: any;
  whichUser: User;
  whichInterviewee: Interviewee;
  status: string;
  color_badge: string;
}
