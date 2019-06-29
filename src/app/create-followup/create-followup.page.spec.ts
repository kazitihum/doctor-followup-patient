import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFollowupPage } from './create-followup.page';

describe('CreateFollowupPage', () => {
  let component: CreateFollowupPage;
  let fixture: ComponentFixture<CreateFollowupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFollowupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFollowupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
