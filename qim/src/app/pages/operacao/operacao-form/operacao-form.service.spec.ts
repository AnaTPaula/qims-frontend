import { TestBed } from '@angular/core/testing';

import { OperacaoFormService } from './operacao-form.service';

describe('OperacaoFormService', () => {
  let service: OperacaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacaoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
