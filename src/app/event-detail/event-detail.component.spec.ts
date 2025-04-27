import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

import {EventDetailComponent} from './event-detail.component';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;

  beforeEach(waitForAsync(() => {
    const route = {
      snapshot: {
        paramMap: convertToParamMap({id: 1})
      }
    };

    TestBed.configureTestingModule({
      declarations: [EventDetailComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useValue: route}],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
