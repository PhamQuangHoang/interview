import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrUpdateIntervieweeComponent } from './hr-update-interviewee.component';

describe('HrUpdateIntervieweeComponent', () => {
  let component: HrUpdateIntervieweeComponent;
  let fixture: ComponentFixture<HrUpdateIntervieweeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrUpdateIntervieweeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUpdateIntervieweeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
