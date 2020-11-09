import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpmodalComponent } from './otpmodal.component';

describe('OtpmodalComponent', () => {
  let component: OtpmodalComponent;
  let fixture: ComponentFixture<OtpmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
