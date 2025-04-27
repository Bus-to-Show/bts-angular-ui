import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {PickupPartyService} from './pickup-party.service';

describe('PickupPartyService', () => {
  let service: PickupPartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(PickupPartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
