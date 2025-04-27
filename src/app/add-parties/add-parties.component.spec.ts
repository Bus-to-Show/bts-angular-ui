import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormBuilder} from '@angular/forms';

import {AddPartiesComponent} from './add-parties.component';

describe('AddPartiesComponent', () => {
  let component: AddPartiesComponent;
  let fixture: ComponentFixture<AddPartiesComponent>;

  beforeEach(waitForAsync(() => {
    const fb = {
      group: () => {
        return {
          setValue: () => undefined,
          value: 'all',
          valueChanges: {
            subscribe: () => undefined,
          },
        };
      },
    };

    TestBed.configureTestingModule({
      declarations: [AddPartiesComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: FormBuilder, useValue: fb}],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartiesComponent);
    component = fixture.componentInstance;
    component.possiblePickups = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
