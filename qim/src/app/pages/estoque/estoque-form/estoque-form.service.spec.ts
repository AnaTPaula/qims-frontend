import { TestBed } from '@angular/core/testing';

import { EstoqueFormService } from './estoque-form.service';

describe('EstoqueFormService', () => {
  let service: EstoqueFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
