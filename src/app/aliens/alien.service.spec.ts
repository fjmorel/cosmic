
import { inject, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AlienService } from './alien.service';

describe('AlienService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlienService],
    });
  });

  it('should be created', inject([AlienService], (service: AlienService) => {
    expect(service).toBeTruthy();
  }));
});
