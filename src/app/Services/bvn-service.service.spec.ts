import { TestBed } from '@angular/core/testing';

import { BvnServiceService } from './bvn-service.service';

describe('BvnServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BvnServiceService = TestBed.get(BvnServiceService);
    expect(service).toBeTruthy();
  });
});
