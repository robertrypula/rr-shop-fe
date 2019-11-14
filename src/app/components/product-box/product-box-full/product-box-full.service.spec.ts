import { TestBed } from '@angular/core/testing';

import { ProductBoxFullService } from './product-box-full.service';

describe('ProductBoxFullService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductBoxFullService = TestBed.get(ProductBoxFullService);
    expect(service).toBeTruthy();
  });
});
