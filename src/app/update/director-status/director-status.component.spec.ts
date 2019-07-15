import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorStatusComponent } from './director-status.component';

describe('DirectorStatusComponent', () => {
  let component: DirectorStatusComponent;
  let fixture: ComponentFixture<DirectorStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
