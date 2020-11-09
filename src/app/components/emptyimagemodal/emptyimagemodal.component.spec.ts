import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyimagemodalComponent } from './emptyimagemodal.component';

describe('EmptyimagemodalComponent', () => {
  let component: EmptyimagemodalComponent;
  let fixture: ComponentFixture<EmptyimagemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyimagemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyimagemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
