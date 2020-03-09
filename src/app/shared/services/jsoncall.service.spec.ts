import { TestBed } from '@angular/core/testing';

import { JsoncallService } from './jsoncall.service';

describe('JsoncallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsoncallService = TestBed.get(JsoncallService);
    expect(service).toBeTruthy();
  });
});
