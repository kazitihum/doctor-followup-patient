import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupRlistPage } from './followup-rlist.page';

describe('FollowupRlistPage', () => {
  let component: FollowupRlistPage;
  let fixture: ComponentFixture<FollowupRlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupRlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupRlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
