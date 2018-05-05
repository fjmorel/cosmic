
import { inject, TestBed } from '@angular/core/testing';

import { AlienService } from './alien.service';

describe('AlienService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlienService],
    });
  });

  it('should be created', inject([AlienService], (service: AlienService) => {
    expect(service).toBeTruthy();
  }));
});
