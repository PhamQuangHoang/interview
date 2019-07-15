import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUpdateComponent } from './main-update.component';

describe('MainUpdateComponent', () => {
  let component: MainUpdateComponent;
  let fixture: ComponentFixture<MainUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
