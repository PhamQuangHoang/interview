import { TestBed } from '@angular/core/testing';

import { IntervieweeService } from './interviewee.service';

describe('IntervieweeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntervieweeService = TestBed.get(IntervieweeService);
    expect(service).toBeTruthy();
  });
});
