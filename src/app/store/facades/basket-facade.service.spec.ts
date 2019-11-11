import { TestBed } from '@angular/core/testing';

import { BasketFacadeService } from './basket-facade.service';

describe('BasketFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasketFacadeService = TestBed.get(BasketFacadeService);
    expect(service).toBeTruthy();
  });
});
