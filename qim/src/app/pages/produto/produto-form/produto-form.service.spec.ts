import { TestBed } from '@angular/core/testing';

import { ProdutoFormService } from './produto-form.service';

describe('ProdutoFormService', () => {
  let service: ProdutoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
