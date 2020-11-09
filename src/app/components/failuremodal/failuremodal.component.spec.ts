import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailuremodalComponent } from './failuremodal.component';

describe('FailuremodalComponent', () => {
  let component: FailuremodalComponent;
  let fixture: ComponentFixture<FailuremodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailuremodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailuremodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
