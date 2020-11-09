import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsignatureComponent } from './uploadsignature.component';

describe('UploadsignatureComponent', () => {
  let component: UploadsignatureComponent;
  let fixture: ComponentFixture<UploadsignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadsignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
