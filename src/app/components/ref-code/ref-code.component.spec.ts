import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefCodeComponent } from './ref-code.component';

describe('RefCodeComponent', () => {
  let component: RefCodeComponent;
  let fixture: ComponentFixture<RefCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
