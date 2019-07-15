import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorUpdateComponent } from './director-update.component';

describe('DirectorUpdateComponent', () => {
  let component: DirectorUpdateComponent;
  let fixture: ComponentFixture<DirectorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
