import { TestBed } from '@angular/core/testing';

import { ProdutoListService } from './produto-list.service';

describe('ProdutoListService', () => {
  let service: ProdutoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
