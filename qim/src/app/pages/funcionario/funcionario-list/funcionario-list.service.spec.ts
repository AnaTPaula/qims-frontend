import { TestBed } from '@angular/core/testing';

import { FuncionarioListService } from './funcionario-list.service';

describe('FuncionarioListService', () => {
  let service: FuncionarioListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionarioListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
