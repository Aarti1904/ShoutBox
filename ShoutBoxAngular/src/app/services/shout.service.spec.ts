import { TestBed } from '@angular/core/testing';

import { ShoutService } from './shout.service';

describe('ShoutService', () => {
  let service: ShoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
