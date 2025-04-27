import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

import {PartyManagementComponent} from './party-management.component';

describe('PartyManagementComponent', () => {
  let component: PartyManagementComponent;
  let fixture: ComponentFixture<PartyManagementComponent>;

  beforeEach(waitForAsync(() => {
    const route = {
      snapshot: {
        paramMap: convertToParamMap({id: 1})
      }
    };

    TestBed.configureTestingModule({
      declarations: [PartyManagementComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useValue: route}],
      schemas: [NO_ERRORS_SCHEMA],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
