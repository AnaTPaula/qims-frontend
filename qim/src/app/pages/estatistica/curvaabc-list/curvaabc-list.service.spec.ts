import { TestBed } from '@angular/core/testing';

import { CurvaAbcListService } from './curvaabc-list.service';

describe('CurvaAbcListService', () => {
  let service: CurvaAbcListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurvaAbcListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
