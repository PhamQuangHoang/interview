import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIntervieweeComponent } from './list-interviewee.component';

describe('ListIntervieweeComponent', () => {
  let component: ListIntervieweeComponent;
  let fixture: ComponentFixture<ListIntervieweeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIntervieweeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIntervieweeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
