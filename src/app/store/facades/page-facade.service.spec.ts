import { TestBed } from '@angular/core/testing';

import { PageFacadeService } from './page-facade.service';

describe('PageFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageFacadeService = TestBed.get(PageFacadeService);
    expect(service).toBeTruthy();
  });
});
