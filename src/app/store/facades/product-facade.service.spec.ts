import { TestBed } from '@angular/core/testing';

import { ProductFacadeService } from './product-facade.service';

describe('ProductFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductFacadeService = TestBed.get(ProductFacadeService);
    expect(service).toBeTruthy();
  });
});
