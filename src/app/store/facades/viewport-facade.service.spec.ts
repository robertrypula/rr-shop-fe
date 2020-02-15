import { TestBed } from '@angular/core/testing';

import { ViewportFacadeService } from './viewport-facade.service';

describe('ViewportFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewportFacadeService = TestBed.get(ViewportFacadeService);
    expect(service).toBeTruthy();
  });
});
