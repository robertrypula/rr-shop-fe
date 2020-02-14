import { TestBed } from '@angular/core/testing';

import { RouterFacadeService } from './router-facade.service';

describe('RouterFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterFacadeService = TestBed.get(RouterFacadeService);
    expect(service).toBeTruthy();
  });
});
