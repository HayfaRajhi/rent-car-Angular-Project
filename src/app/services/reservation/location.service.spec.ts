import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';

describe('LocationService', () => {
  let service: ReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
