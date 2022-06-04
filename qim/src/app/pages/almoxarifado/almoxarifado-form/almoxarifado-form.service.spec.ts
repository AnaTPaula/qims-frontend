import { TestBed } from '@angular/core/testing';

import { AlmoxarifadoFormService } from './almoxarifado-form.service';

describe('AlmoxarifadoFormService', () => {
  let service: AlmoxarifadoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmoxarifadoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
