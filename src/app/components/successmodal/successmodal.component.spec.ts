import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessmodalComponent } from './successmodal.component';

describe('SuccessmodalComponent', () => {
  let component: SuccessmodalComponent;
  let fixture: ComponentFixture<SuccessmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
