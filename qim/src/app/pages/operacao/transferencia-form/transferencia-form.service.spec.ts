import { TestBed } from '@angular/core/testing';

import { TransferenciaFormService } from './transferencia-form.service';

describe('TransferenciaFormService', () => {
  let service: TransferenciaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferenciaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
