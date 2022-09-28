import { TestBed } from '@angular/core/testing';

import { OperadorListService } from './operador-list.service';

describe('OperadorListService', () => {
  let service: OperadorListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperadorListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
