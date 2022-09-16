import { TestBed } from '@angular/core/testing';

import { EstoqueListService } from './Estoque-list.service';

describe('EstoqueListService', () => {
  let service: EstoqueListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
