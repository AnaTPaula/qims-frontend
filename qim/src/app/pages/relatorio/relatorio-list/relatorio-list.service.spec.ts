import { TestBed } from '@angular/core/testing';

import { RelatorioListService } from './relatorio-list.service';

describe('RelatorioListService', () => {
  let service: RelatorioListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
