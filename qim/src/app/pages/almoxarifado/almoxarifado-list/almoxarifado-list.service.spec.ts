import { TestBed } from '@angular/core/testing';

import { AlmoxarifadoListService } from './almoxarifado-list.service';

describe('AlmoxarifadoListService', () => {
  let service: AlmoxarifadoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmoxarifadoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
