import { TestBed } from '@angular/core/testing';

import { RotationalTestingService } from './rotational-testing.service';

describe('RotationalTestingService', () => {
  let service: RotationalTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotationalTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
