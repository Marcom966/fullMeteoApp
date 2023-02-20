import { TestBed } from '@angular/core/testing';

import { UserLogServiceService } from './user-log-service.service';

describe('UserLogServiceService', () => {
  let service: UserLogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
