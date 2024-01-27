import { TestBed } from '@angular/core/testing';

import { ApprovedService } from './approved.service';

describe('ApprovedService', () => {
  let service: ApprovedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
