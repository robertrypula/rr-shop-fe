import { TestBed } from '@angular/core/testing';

import { ProductBoxCompactService } from './product-box-compact.service';

describe('ProductBoxCompactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductBoxCompactService = TestBed.get(ProductBoxCompactService);
    expect(service).toBeTruthy();
  });
});
