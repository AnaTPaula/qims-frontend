import { TestBed } from '@angular/core/testing';

import { EmpresaFormService } from './empresa-form.service';

describe('EmpresaFormService', () => {
  let service: EmpresaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
