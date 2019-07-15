import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Interviewee } from '../models/interviewee.model';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataSource = new BehaviorSubject<Interviewee[]>(null);
  public currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(interviewees : Interviewee[]){
    this.dataSource.next(interviewees);
  }
}
