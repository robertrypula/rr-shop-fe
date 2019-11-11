import { TestBed } from '@angular/core/testing';

import { BarFacadeService } from './bar-facade.service';

describe('BarFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarFacadeService = TestBed.get(BarFacadeService);
    expect(service).toBeTruthy();
  });
});
