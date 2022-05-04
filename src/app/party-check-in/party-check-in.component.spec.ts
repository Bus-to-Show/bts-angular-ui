import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyCheckInComponent } from './party-check-in.component';

describe('PartyCheckInComponent', () => {
  let component: PartyCheckInComponent;
  let fixture: ComponentFixture<PartyCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyCheckInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
