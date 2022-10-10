import { TestBed } from '@angular/core/testing';

import { EstatisticaListService } from './estatistica-list.service';

describe('EstatisticaListService', () => {
  let service: EstatisticaListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstatisticaListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
