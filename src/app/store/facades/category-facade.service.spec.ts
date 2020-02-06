import { TestBed } from '@angular/core/testing';

import { CategoryFacadeService } from './category-facade.service';

describe('CategoryFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryFacadeService = TestBed.get(CategoryFacadeService);
    expect(service).toBeTruthy();
  });
});
