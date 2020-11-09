import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNavsComponent } from './card-navs.component';

describe('CardNavsComponent', () => {
  let component: CardNavsComponent;
  let fixture: ComponentFixture<CardNavsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardNavsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
