import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {JwtHelperService} from '@auth0/angular-jwt';

import {ResetPassFormComponent} from './reset-pass-form.component';

describe('ResetPassFormComponent', () => {
  let component: ResetPassFormComponent;
  let fixture: ComponentFixture<ResetPassFormComponent>;

  beforeEach(waitForAsync(() => {
    const jwtHelper = {
      decodeToken: () => {
        return {username: 'foo' };
      },
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
      declarations: [ResetPassFormComponent],
      providers: [{provide: JwtHelperService, useValue: jwtHelper}],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
