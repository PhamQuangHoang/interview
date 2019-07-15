import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerUpdateComponent } from './interviewer-update.component';

describe('InterviewerUpdateComponent', () => {
  let component: InterviewerUpdateComponent;
  let fixture: ComponentFixture<InterviewerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
