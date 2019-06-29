import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReplayPage } from './patient-replay.page';

describe('PatientReplayPage', () => {
  let component: PatientReplayPage;
  let fixture: ComponentFixture<PatientReplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
