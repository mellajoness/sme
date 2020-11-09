import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandConditionsComponent } from './termsand-conditions.component';

describe('TermsandConditionsComponent', () => {
  let component: TermsandConditionsComponent;
  let fixture: ComponentFixture<TermsandConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsandConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsandConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
