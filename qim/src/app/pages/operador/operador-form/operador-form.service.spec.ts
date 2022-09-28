import { TestBed } from '@angular/core/testing';

import { OperadorFormService } from './operador-form.service';

describe('OperadorFormService', () => {
  let service: OperadorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperadorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
