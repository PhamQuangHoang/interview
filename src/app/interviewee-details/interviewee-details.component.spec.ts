import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervieweeDetailsComponent } from './interviewee-details.component';

describe('IntervieweeDetailsComponent', () => {
  let component: IntervieweeDetailsComponent;
  let fixture: ComponentFixture<IntervieweeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervieweeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervieweeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
