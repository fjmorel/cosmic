
import { inject, TestBed } from '@angular/core/testing';

import { AlienGeneratorService } from './service';

describe('AlienGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlienGeneratorService],
    });
  });

  it('should be created', inject([AlienGeneratorService], (service: AlienGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
