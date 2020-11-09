import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalnfoComponent } from './personalnfo.component';

describe('PersonalnfoComponent', () => {
  let component: PersonalnfoComponent;
  let fixture: ComponentFixture<PersonalnfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalnfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalnfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
