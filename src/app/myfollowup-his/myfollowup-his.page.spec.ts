import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfollowupHisPage } from './myfollowup-his.page';

describe('MyfollowupHisPage', () => {
  let component: MyfollowupHisPage;
  let fixture: ComponentFixture<MyfollowupHisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfollowupHisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfollowupHisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
