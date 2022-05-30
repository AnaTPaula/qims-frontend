import { TestBed } from '@angular/core/testing';

import { EmpresaListService } from './empresa-list.service';

describe('EmpresaListService', () => {
  let service: EmpresaListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
