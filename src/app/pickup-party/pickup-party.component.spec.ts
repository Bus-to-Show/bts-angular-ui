import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupPartyComponent } from './pickup-party.component';

describe('PickupPartyComponent', () => {
  let component: PickupPartyComponent;
  let fixture: ComponentFixture<PickupPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
