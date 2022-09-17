import { TestBed } from '@angular/core/testing';

import { LoteListService } from './lote-list.service';

describe('LoteListService', () => {
  let service: LoteListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoteListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
