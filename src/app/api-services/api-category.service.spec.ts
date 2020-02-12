import { TestBed } from '@angular/core/testing';

import { ApiCategoryService } from './api-category.service';

describe('ApiCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCategoryService = TestBed.get(ApiCategoryService);
    expect(service).toBeTruthy();
  });
});
