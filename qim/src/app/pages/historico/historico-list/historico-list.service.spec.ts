import { TestBed } from '@angular/core/testing';

import { HistoricoListService } from './historico-list.service';

describe('HistoricoListService', () => {
  let service: HistoricoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
