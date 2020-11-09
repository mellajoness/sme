import { TestBed, async, inject } from '@angular/core/testing';

import { PersonInfoPageGuardGuard } from './person-info-page-guard.guard';

describe('PersonInfoPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonInfoPageGuardGuard]
    });
  });

  it('should ...', inject([PersonInfoPageGuardGuard], (guard: PersonInfoPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
