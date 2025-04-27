import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

import {PartyCheckInComponent} from './party-check-in.component';

describe('PartyCheckInComponent', () => {
  let component: PartyCheckInComponent;
  let fixture: ComponentFixture<PartyCheckInComponent>;

  beforeEach(waitForAsync(() => {
    const route = {
      snapshot: {
        paramMap: convertToParamMap({id: 1})
      }
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PartyCheckInComponent],
      providers: [{provide: ActivatedRoute, useValue: route}],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
