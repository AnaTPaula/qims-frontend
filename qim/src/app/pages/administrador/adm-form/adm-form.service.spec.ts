import { TestBed } from '@angular/core/testing';

import { AdmFormService } from './adm-form.service';

describe('AdmFormService', () => {
  let service: AdmFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
