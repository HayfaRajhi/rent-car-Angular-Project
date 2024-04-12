import { TestBed } from '@angular/core/testing';

import { ProcessinghttpmsgService } from './processinghttpmsg.service';

describe('ProcessinghttpmsgService', () => {
  let service: ProcessinghttpmsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessinghttpmsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
