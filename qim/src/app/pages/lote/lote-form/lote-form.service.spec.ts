import { TestBed } from '@angular/core/testing';

import { EstoqueFormService } from './lote-form.service';

describe('LoteFormService', () => {
  let service: LoteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoteFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
