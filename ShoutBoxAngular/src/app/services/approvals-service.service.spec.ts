import { TestBed } from '@angular/core/testing';

import { ApprovalsServiceService } from './approvals-service.service';

describe('ApprovalsServiceService', () => {
  let service: ApprovalsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
