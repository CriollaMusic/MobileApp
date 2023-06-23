import { TestBed } from '@angular/core/testing';

import { MusicGenderService } from './music-gender.service';

describe('MusicGenderService', () => {
  let service: MusicGenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicGenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
