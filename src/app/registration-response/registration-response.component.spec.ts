import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationResponseComponent } from './registration-response.component';

describe('RegistrationResponseComponent', () => {
  let component: RegistrationResponseComponent;
  let fixture: ComponentFixture<RegistrationResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
