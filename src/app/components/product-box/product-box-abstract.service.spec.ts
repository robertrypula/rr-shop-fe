import { TestBed } from '@angular/core/testing';

import { ProductBoxAbstractService } from './product-box-abstract.service';

describe('ProductBoxAbstractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductBoxAbstractService = TestBed.get(ProductBoxAbstractService);
    expect(service).toBeTruthy();
  });
});
