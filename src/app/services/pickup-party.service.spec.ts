import { TestBed } from '@angular/core/testing';

import { PickupPartyService } from './pickup-party.service';

describe('PickupPartyService', () => {
  let service: PickupPartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickupPartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
