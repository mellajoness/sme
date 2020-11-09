import { TestBed } from '@angular/core/testing';

import { RefCodeService } from './ref-code.service';

describe('RefCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefCodeService = TestBed.get(RefCodeService);
    expect(service).toBeTruthy();
  });
});
