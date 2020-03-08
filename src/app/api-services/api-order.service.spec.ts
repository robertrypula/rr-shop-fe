import { TestBed } from '@angular/core/testing';

import { ApiOrderService } from './api-order.service';

describe('ApiOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiOrderService = TestBed.get(ApiOrderService);
    expect(service).toBeTruthy();
  });
});
