import { TestBed } from '@angular/core/testing';

import { CompanySearchService } from './company-search.service';

describe('CompanySearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanySearchService = TestBed.get(CompanySearchService);
    expect(service).toBeTruthy();
  });
});
